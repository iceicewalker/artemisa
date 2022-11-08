import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getDoc, onSnapshot, query } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { InvoicePage } from 'src/app/modals/invoice/invoice.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';
import { AddOrderPage } from '../add-order/add-order.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  counter: any = { p: 0, c: 0, t: 0, cc: 0 }
  p: number = 1; 
  isDescOrder: boolean = true;
  orderHeader: String ='';
  sortDirection = 1;
  searchInput: any = { };
  filter: any = "";
  orders: any = [];
  categories: any = [];
  types: any = [{name: 'Descripción', id: 'descripcion'}, {name: 'Identificador', id: 'id'}, {name: 'Nombre y Apellido', id: 'usuarioNombre'}, {name: 'Correo', id: 'correo'}, {name: 'Documento (Cliente)', id: 'documentoValor'}]
  
  constructor(private customerService: CustomerService, private spinner: NgxSpinnerService, private orderService: OrderService, private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.spinner.show();
    this.loadOrders();
  }

  loadOrders(){ //Retrieves all orders from the database
    const q = this.orderService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.orders = querySnapshot.docs.map((doc) => {
        if(doc.data()['estado'] === 0)
          this.counter.p++;
        if(doc.data()['estado'] === 1)
          this.counter.c++;
        if(doc.data()['estado'] === 2)
          this.counter.cc++;
        this.counter.t++;
        const querySnapshot = getDoc(this.customerService.doc(doc.data()['usuario']));
        let payload = Object.assign(doc.data(), { id: doc.id, ref: doc.ref });
        querySnapshot.then((r) => { if(r.exists()){ payload.usuarioData = Object.assign(r.data(), { id: r.id }); payload.usuarioNombre = r.data()['nombre'] + " " + r.data()['apellido']; payload.correo = r.data()['correo']; payload.documentoValor = r.data()['documentoValor'] } })
        return payload;
      })
      console.log(this.orders);
      this.spinner.hide();
    });
  }
  
  
  async modify(order){ //Opens a modal to modify the order from the param
    const modal = await this.modal.create({
      component: AddOrderPage,
      componentProps: {data: order},
      cssClass: 'evaluate-modal'
    });
    modal.present();
  } 

  delete(product){ //Deletes an order
    this.alertService.fire({
      title: '¿Estás seguro de borrar el pedido?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.delete(product.id).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El pedido se ha eliminado con éxito.' });
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
  
  async invoice(order){ //Opens the invoice of the order
    const modal = await this.modal.create({
      component: InvoicePage,
      componentProps: {data: order},
      cssClass: 'evaluate-modal-l'
    });
    modal.present();
    console.log(order);
  }
}
