import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.page.html',
  styleUrls: ['./view-products.page.scss'],
})
export class ViewProductsPage implements OnInit {

  @Input() products: any;
  stage: Number = 0;
  p: number = 1; 
  isDescOrder: boolean = true;
  orderHeader: String ='';
  sortDirection = 1;
  searchInput: any = { nombre: '' };
  filter: any = "";
  categories: any = [];
  types: any = [{name: 'Nombre', id: 'nombre'}, {name: 'SKU', id: 'sku'}, {name: 'Categoría', id: 'categoryName'}, {name: 'Precio', id: 'precio'}, {name: 'Costo', id: 'costo'}, {name: 'Stock', id: 'stock'}, {name: 'Descripción', id: 'descripcion'}]
  cart: any = [];
  productSelected: any = [];
  
  constructor(private modal: ModalController) { }

  ngOnInit() { }

  selectProducts(){
    this.modal.dismiss();
  }

}
