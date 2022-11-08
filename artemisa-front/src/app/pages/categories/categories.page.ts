import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddCategoryPage } from '../add-category/add-category.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  public p: number = 1; 
  public isDescOrder: boolean = true;
  public orderHeader: String ='';
  public sortDirection = 1;
  public searchInput: any = { nombre: '' };
  public cats: any;
  
  constructor(private userService: UserService, private categoryService: CategoryService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories(){ //Load all the data
    const q = this.userService.getCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.cats = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) })
    });
  }


  async modify(cat){ //Modify a category
    const modal = await this.modal.create({
      component: AddCategoryPage,
      componentProps: {data: cat}
    });
    modal.present();
  } 

  delete(cat){ //Deletes a category
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
        this.categoryService.delete(cat.id).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'La categoría se ha eliminado con éxito.' });
        })
      }
    });
  }

  sort(headerName){ //Sorts by header
    this.isDescOrder = !this.isDescOrder;
    if(this.isDescOrder)
      this.sortDirection = 1
    else
      this.sortDirection =2
    this.orderHeader = headerName;
  }

}
