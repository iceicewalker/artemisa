import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductLogPage } from 'src/app/modals/product-log/product-log.page';
import { StockPage } from 'src/app/modals/stock/stock.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';
import { AddInventoryPage } from '../add-inventory/add-inventory.page';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  public counter: any = { p: 0, c: 0, t: 0 }
  public p: number = 1; 
  public isDescOrder: boolean = true;
  public orderHeader: String ='';
  public sortDirection = 1;
  public searchInput: any = { nombre: '' };
  public filter: any = "";
  public products: any = [];
  public categories: any = [];
  public types: any = [{name: 'Nombre', id: 'nombre'}, {name: 'SKU', id: 'sku'}, {name: 'Categoría', id: 'categoryName'}, {name: 'Precio', id: 'precio'}, {name: 'Costo', id: 'costo'}, {name: 'Stock', id: 'stock'}, {name: 'Descripción', id: 'descripcion'}]
  
  constructor(private spinner: NgxSpinnerService, private productService: ProductService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.spinner.show();
    this.getCategories();
  }

  getCategories(){ //Get all categories from the database
    const q = this.productService.getProductCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.categories = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) });
      this.loadProducts();
    });
  }

  loadProducts(){ //Retrieve all products
    const q = this.productService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.counter = { p: 0, c: 0, t: 0 }
      this.products = querySnapshot.docs.map((doc) => {
        let cat = this.categories.find((cat) => cat.id === doc.data()['categoria'])
        if(doc.data()['stock'] <= doc.data()['stockMinimo'])
          this.counter.p++;
        else if(doc.data()['stock'] <= doc.data()['stockMedio'])
          this.counter.c++;
        else 
          this.counter.t++;
        return Object.assign(doc.data(), { id: doc.id, ref: doc.ref, categoryName: cat ? cat.nombre : "Sin categoría"}) 
      })
      this.spinner.hide();
    });
  }

  async modify(product){ //Opens a modal to modify te inventory
    const modal = await this.modal.create({
      component: AddInventoryPage,
      componentProps: {data: product},
      cssClass: 'evaluate-modal'
    });
    modal.present();
  } 

  async logs(product){ //Opens a modal with the log of the product.
    const modal = await this.modal.create({
      component: ProductLogPage,
      componentProps: {data: product},
      cssClass: 'evaluate-modal-l'
    });
    modal.present();
  }

  async stock(product, type){ //Opens a modal to increase or decrease the stock of the product
    const modal = await this.modal.create({
      component: StockPage,
      componentProps: {data: product, type: type}
    });
    modal.present();
  }

  delete(product){ //Deletes the product from the database
    this.alertService.fire({
      title: '¿Estás seguro de borrar el producto?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(product.id).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El producto se ha eliminado con éxito.' });
        })
      }
    });
  }

  sort(headerName){ //Sorts by header param
    this.isDescOrder = !this.isDescOrder;
    if(this.isDescOrder)
      this.sortDirection = 1
    else
      this.sortDirection =2
    this.orderHeader = headerName;
  }

}
