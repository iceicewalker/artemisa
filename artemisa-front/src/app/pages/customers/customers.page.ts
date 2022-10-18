import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot, query } from 'firebase/firestore';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { AddCustomerPage } from '../add-customer/add-customer.page';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  p: number = 1; 
  isDescOrder: boolean = true;
  orderHeader: String ='';
  sortDirection = 1;
  searchInput: any = { nombre: '', apellido: '' };
  users: any;
  types: any = [];
  counter: any = { m: 0, y: 0, t: 0 }
  constructor(private userService: CustomerService, private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    const q = this.userService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) });
      var currentDate = new Date();
      var curMonth = currentDate.getMonth() + 1;
      var curYear = currentDate.getFullYear();
      this.users.forEach((u) => {
        let date = new Date(u.creacion.toDate());
        if(date.getFullYear() === curYear){
          if(date.getMonth() + 1 === curMonth){ this.counter.m++; }
          this.counter.y++;
        }
      })
      this.counter.t = this.users.length;
    });
  }

  async modify(user){
    const modal = await this.modal.create({
      component: AddCustomerPage,
      componentProps: {data: user},
      cssClass: 'evaluate-modal'
    });
    modal.present();
  } 

  delete(user){
    this.alertService.fire({
      title: '¿Estás seguro de borrar el cliente?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user.id).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El cliente se ha eliminado con éxito.' });
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
