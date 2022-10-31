import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { getDocs, onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'src/app/globals';
import { ViewProductsPage } from 'src/app/modals/view-products/view-products.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddCustomerPage } from '../add-customer/add-customer.page';

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
  searchInput: any = { nombre: '', selected: true };
  filter: any = "";
  products: any;
  categories: any = [];
  cart: any = [];
  form: FormGroup;
  cantones: any = [];
  customer: any = {};
  provs = this.globals.provincias;
  constructor(private globals: Globals, private customerService: CustomerService, private userService: UserService, private fb: FormBuilder, private spinner: NgxSpinnerService, private productService: ProductService,  private alertService: AlertService, private modal: ModalController) { }

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
      "direccion": [{value: "", disabled: true}, [Validators.required]],
      "id": [null, [Validators.required]]
    });
  }

  submit(){

  }

  setCantones(){
    this.cantones = this.provs.find((p) => p.id === this.customer?.provincia)['datos'];
    this.form.controls['canton'].setValue("");
  }      

  async add(){
    const modal = await this.modal.create({
      component: AddCustomerPage,
      componentProps: {newUser: {documentoTipo: this.form.value['documentoTipo'], documentoValor: this.form.value['documentoValor']}},
      cssClass: 'evaluate-modal'
    });
    modal.present();
    modal.onDidDismiss().then((r) => {
      if(r.data?.newUser){
        this.customer = r.data?.newUser;
        this.loadCustomerData();
      }
    })
  }

  async modify(){
    const modal = await this.modal.create({
      component: AddCustomerPage,
      componentProps: {data: this.customer},
      cssClass: 'evaluate-modal'
    });
    modal.present();
    modal.onDidDismiss().then((r) => {
      if(r.data?.data){
        this.customer = r.data?.data;
        console.log(this.customer)
        this.loadCustomerData();
      }
    })
  } 
  
  async searchUser(){
    let payload = {documentoValor: this.form.value['documentoValor']}
    const querySnapshot = await getDocs(this.customerService.getByPar("documentoValor", payload?.documentoValor));
    if(querySnapshot.empty){
      this.customer = {};
      this.form.controls['nombre'].setValue("");
      this.form.controls['apellido'].setValue("");
      this.form.controls['email'].setValue("");
      this.form.controls['telefono'].setValue("");
      this.form.controls['categoria'].setValue("");
      this.form.controls['provincia'].setValue("");
      this.form.controls['canton'].setValue("");
      this.form.controls['direccion'].setValue("");
      this.form.controls['id'].setValue("");
      this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'No existe un cliente con el documento ingresado.' })
      this.spinner.hide();
    }else{
      this.customer = Object.assign(querySnapshot.docs[0].data(), {id: querySnapshot.docs[0].id});
      this.loadCustomerData();
      this.alertService.toast({ icon: 'success', title: '¡Cliente encontrado!', text: 'El cliente se ha encontrado con éxito.' });
      this.spinner.hide();
    }
  }

  loadCustomerData(){
    if(this.customer?.documentoTipo){ this.form.controls['documentoTipo'].setValue(this.customer?.documentoTipo); }
    this.form.controls['nombre'].setValue(this.customer?.nombre);
    this.form.controls['apellido'].setValue(this.customer?.apellido);
    this.form.controls['email'].setValue(this.customer?.email);
    this.form.controls['telefono'].setValue(this.customer?.telefono);
    this.form.controls['categoria'].setValue(this.customer?.categoria);
    this.form.controls['provincia'].setValue(this.customer?.provincia); 
    this.setCantones();
    this.form.controls['canton'].setValue(this.customer?.canton);
    this.form.controls['direccion'].setValue(this.customer?.direccion);
    this.form.controls['id'].setValue(this.customer?.id);
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
        return Object.assign(doc.data(), { id: doc.id, selected: false, ref: doc.ref, categoryName: cat ? cat.nombre : "Sin categoría"}) 
      })
      this.spinner.hide();
    });
  }

}
