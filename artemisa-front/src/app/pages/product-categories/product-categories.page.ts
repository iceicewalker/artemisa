import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddProductCategoryPage } from '../add-product-category/add-product-category.page';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {

  public p: number = 1; 
  public isDescOrder: boolean = true;
  public orderHeader: String ='';
  public sortDirection = 1;
  public searchInput: any = { nombre: '' };
  public filter: any = "";
  public types: any = [{name: 'Nombre', id: 'nombre'}]
  public cats: any;
  
  constructor(private userService: UserService, private categoryService: ProductService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){
    const q = this.userService.getProductCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.cats = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) })
    });
  }


  async modify(cat){
    const modal = await this.modal.create({
      component: AddProductCategoryPage,
      componentProps: {data: cat}
    });
    modal.present();
  } 

  delete(cat){
    this.alertService.fire({
      title: '¿Estás seguro de borrar la categoría?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(cat.id).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'La categoría se ha eliminado con éxito.' });
        })
      }
    });
  }

  sort(headerName){
    this.isDescOrder = !this.isDescOrder;
    if(this.isDescOrder)
      this.sortDirection = 1
    else
      this.sortDirection =2
    this.orderHeader = headerName;
  }

}
