import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewProductsPage } from 'src/app/modals/view-products/view-products.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

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
  cart: any = [];
  form: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private spinner: NgxSpinnerService, private productService: ProductService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.createForm();
    this.spinner.show();
    this.getCategories();
  }

  createForm(){
    this.form = this.fb.group({ 
      "documentoTipo": ["", [Validators.required]],
      "documentoValor": ["", [Validators.required, this.userService.idValidator]],
      "nombre": [{value: "", disabled: true}, [Validators.required]],
      "apellido": [{value: "", disabled: true}, [Validators.required]],
      "email": [{value: "", disabled: true}, [Validators.required]],
      "telefono": [{value: "", disabled: true}, [Validators.required]],
      "categoria": [{value: "", disabled: true}, [Validators.required]],
      "provincia": [{value: "", disabled: true}, [Validators.required]],
      "canton": [{value: "", disabled: true}, [Validators.required]],
      "direccion": [{value: "", disabled: true}, [Validators.required]] });
  }

  submit(){

  }

  async selectProducts(){
    const modal = await this.modal.create({
      component: ViewProductsPage,
      componentProps: {products: this.products},
      cssClass: 'evaluate-modal'
    });
    modal.present();
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
