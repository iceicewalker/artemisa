import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.page.html',
  styleUrls: ['./add-order.page.scss'],
})
export class AddOrderPage implements OnInit {
  @Input() data: any;
  stage: Number = 0;
  p: number = 1; 
  isDescOrder: boolean = true;
  orderHeader: String ='';
  sortDirection = 1;
  searchInput: any = { nombre: '' };
  filter: any = "";
  products: any;
  categories: any = [];
  types: any = [{name: 'Nombre', id: 'nombre'}, {name: 'SKU', id: 'sku'}, {name: 'Categoría', id: 'categoryName'}, {name: 'Precio', id: 'precio'}, {name: 'Costo', id: 'costo'}, {name: 'Stock', id: 'stock'}, {name: 'Descripción', id: 'descripcion'}]
  cart: any = [];
  
  constructor(private spinner: NgxSpinnerService, private productService: ProductService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.spinner.show();
    this.getCategories();
  }
  getCategories(){
    const q = this.productService.getProductCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.categories = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) });
      this.loadProducts();
    });
  }

  loadProducts(){
    const q = this.productService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.products = querySnapshot.docs.map((doc) => {
        let cat = this.categories.find((cat) => cat.id === doc.data()['categoria'])
        return Object.assign(doc.data(), { id: doc.id, ref: doc.ref, categoryName: cat ? cat.nombre : "Sin categoría"}) 
      })
      this.spinner.hide();
    });
  }

}
