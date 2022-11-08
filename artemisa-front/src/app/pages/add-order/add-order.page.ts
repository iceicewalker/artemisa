import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { arrayUnion, getDocs, increment, onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'src/app/globals';
import { ViewProductsPage } from 'src/app/modals/view-products/view-products.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
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
  public stage: Number = 0;
  public p: number = 1; 
  public isDescOrder: boolean = true;
  public orderHeader: String ='';
  public sortDirection = 1;
  public searchInput: any = { selected: true };
  public filter: any = "";
  public products: any;
  public categories: any = [];
  public cart: any = [];
  public form: FormGroup;
  public cantones: any = [];
  public total = { total: 0, iva: 0, ivaPorcentaje: Number(this.globals.iva) }
  public user: any = {};
  public customer: any = {};
  public provs = this.globals.provincias;
  constructor(private orderService: OrderService, private modalController: ModalController, private cdr: ChangeDetectorRef, private globals: Globals, private customerService: CustomerService, private userService: UserService, private fb: FormBuilder, private spinner: NgxSpinnerService, private productService: ProductService,  private alertService: AlertService) { }

  ngOnInit() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => { if(user){ this.user = user;  }else{ this.user = {}; } })
    this.createForm();
    if(this.data){
      this.customer = this.data?.usuarioData
      this.form.controls['documentoTipo'].setValue(this.data?.usuarioData?.documentoTipo);
      this.form.controls['documentoValor'].setValue(this.data?.usuarioData?.documentoValor);
      this.form.controls['nombre'].setValue(this.data?.usuarioData?.nombre);
      this.form.controls['apellido'].setValue(this.data?.usuarioData?.apellido);
      this.form.controls['email'].setValue(this.data?.usuarioData?.email);
      this.form.controls['telefono'].setValue(this.data?.usuarioData?.telefono);
      this.form.controls['categoria'].setValue(this.data?.usuarioData?.categoria);
      this.form.controls['provincia'].setValue(this.data?.usuarioData?.provincia); this.setCantones();
      this.form.controls['canton'].setValue(this.data?.usuarioData?.canton);
      this.form.controls['direccion'].setValue(this.data?.usuarioData?.direccion);
      this.form.controls['descripcion'].setValue(this.data?.descripcion);
      this.form.controls['estado'].setValue(this.data?.estado);
      this.form.controls['id'].setValue(this.data?.usuarioData?.id);
      if(this.data?.estado !== 0){
        this.form.controls['documentoTipo'].disable();
        this.form.controls['documentoValor'].disable();
        this.form.controls['estado'].disable();
        this.form.controls['descripcion'].disable();
        this.products = this.data?.productos;
        this.products.forEach((p) => {p.selected = true});
        this.calculate();
      }
    }
    this.spinner.show();
    if(!this.data || this.data?.estado === 0)
      this.getCategories();
    else
      this.spinner.hide();
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
      "descripcion": [""],
      "estado": ["", [Validators.required]],
      "id": [null, [Validators.required]]
    });
  }

  async submit(){ //Checks if the form is valid, and set the required information.
    this.spinner.show();
    let productos = this.products.filter((f) => f.selected === true && f.cantidad > 0);
    if(this.form.valid && productos.length > 0){
        var payload = {
          usuario: this.form.value?.id,
          descripcion: this.form.value?.descripcion,
          productos: productos,
          fecha: new Date(),
          total: this.total,
          empleado: this.user.uid,
          estado: Number(this.form.value?.estado)
        }
        if(this.data){
          payload['id'] = this.data['id'];
          this.orderService.set(payload).then((r) => {
            payload.productos.forEach((p) => {
              if(payload.estado === 1){
                let mov = { stock: p.cantidad * -1, costo: 0, descripcion: `Consumido en el pedido: ${payload['id']}.`, fecha: new Date() }
                this.productService.set({id: p.id, stock: increment( p.cantidad * -1 ), movimientos: arrayUnion(mov),});
                if((p.stock - p.cantidad) <= p.stockMinimo){
                  this.productService.sendWhatsapp('stock_bajo', [{"type": "text", "text": ''}, {"type": "text", "text": p.sku}, {"type": "text", "text": (p.stock - p.cantidad)}]);
                }
              }
            })
            this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El pedido se ha actualizado con éxito.' });
            this.form.reset();
            this.modalController.dismiss();
            this.spinner.hide();
          }).catch((e) => {
            this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
            this.spinner.hide();
          });
        }else{
          this.orderService.add(payload).then((r) => {
            payload.productos.forEach((p) => {
              if(payload.estado === 1){
                let mov = { stock: p.cantidad * -1, costo: 0, descripcion: `Consumido en el pedido: ${r.id}.`, fecha: new Date() }
                this.productService.set({id: p.id, stock: increment( p.cantidad * -1 ), movimientos: arrayUnion(mov),});
                if((p.stock - p.cantidad) <= p.stockMinimo){
                  this.productService.sendWhatsapp('stock_bajo', [{"type": "text", "text": ''}, {"type": "text", "text": p.sku}, {"type": "text", "text": (p.stock - p.cantidad)}]);
                }
              }
              p.cantidad = 1; p.selected = false; 
            })
            this.total.total = 0;
            this.total.iva = 0;
            this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El pedido se ha registrado con éxito.' });
            this.form.reset();
            this.spinner.hide();
          });
        }
      }else{
        this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Debes completar todos los campos y seleccionar como mínimo 1 producto.' })
        this.form.markAllAsTouched();
        this.spinner.hide();
      }
  }

  setCantones(){
    this.cantones = this.provs.find((p) => p.id === this.customer?.provincia)['datos'];
    this.form.controls['canton'].setValue("");
  }      

  async add(){
    const modal = await this.modalController.create({
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

  async modify(){ //Modify the user
    const modal = await this.modalController.create({
      component: AddCustomerPage,
      componentProps: {data: this.customer},
      cssClass: 'evaluate-modal'
    });
    modal.present();
    modal.onDidDismiss().then((r) => {
      if(r.data?.data){
        this.customer = r.data?.data;
        this.loadCustomerData();
      }
    })
  } 
  
  async searchUser(){ //Search user
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
    const modal = await this.modalController.create({
      component: ViewProductsPage,
      componentProps: {products: this.products},
      cssClass: 'evaluate-modal'
    });
    modal.present();
    modal.onDidDismiss().then(() => {
      this.calculate();
    })
  }

  getCategories(){ //Get categories from the database
    const q = this.productService.getProductCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.categories = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) });
      this.loadProducts();
    });
  }

  loadProducts(){ //Load products from the database
    const q = this.productService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.products = querySnapshot.docs.map((doc) => {
        let cat = this.categories.find((cat) => cat.id === doc.data()['categoria'])
        let prod = Object.assign(doc.data(), { id: doc.id, selected: false, ref: doc.ref, categoryName: cat ? cat.nombre : "Sin categoría", cantidad: 1});
        if(prod?.movimientos)
          delete prod.movimientos;
        return prod;
      })
      if(this.data && this.data?.estado === 0){
        let products = this.data?.productos;
        this.products.forEach((p) => {
          let item = products.find((pT) => pT.id === p.id);
          if(item){
            p.selected = true;
            p.cantidad = item.cantidad;
          }
        });
      }
      this.calculate();
      this.spinner.hide();
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
  validateQuantity(product){ //Validates the quantity of the product based on the stock.
    if(product.stock < product.cantidad){
      product.cantidad = product.stock;
      this.cdr.markForCheck();
      this.alertService.toast({ icon: 'error', title: '¡No existen más unidades en stock!', text: `El stock actual del producto es de ${product.stock} unidades.` })
    }
    this.calculate();
  }

  calculate(){ //Calculates the totals of the order.
    this.total.total = 0;
    this.total.iva = 0;
    this.products.forEach((prod) => { if(prod.selected){ this.total.total += prod?.precio * prod?.cantidad;  } })
    this.total.iva = Math.round(this.total.total * this.total.ivaPorcentaje * 100) / 100;
    this.total.total *= (1 + this.total.ivaPorcentaje);
    this.total.total = Math.round(this.total.total * 100) / 100;
  }
  closeModal(){ //Close the modal
    this.modalController.dismiss();
  }
}
function Int64(deltaQty: any): number {
  throw new Error('Function not implemented.');
}

