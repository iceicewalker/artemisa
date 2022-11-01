import { Component, OnInit } from '@angular/core';
import { getDoc, onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  counter: any = { p: 0, c: 0, t: 0, cc: 0 }
  counterC: any = { m: 0, y: 0, t: 0 }
  orders: any = [];
  users: any = [];
  constructor(private spinner: NgxSpinnerService, private orderService: OrderService, private userService: CustomerService) { }

  ngOnInit() {
    this.loadOrders();
    this.loadUsers();
  }

  loadUsers(){
    const q = this.userService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref}) });
      var currentDate = new Date();
      var curMonth = currentDate.getMonth() + 1;
      var curYear = currentDate.getFullYear();
      console.log(this.users);
      this.users.forEach((u) => {
        let date = new Date(u.creacion.toDate());
        if(date.getFullYear() === curYear){
          if(date.getMonth() + 1 === curMonth){ this.counterC.m++; }
          this.counterC.y++;
        }
      })
      this.counterC.t = this.users.length;
      this.spinner.hide();
    });
  }
  loadOrders(){
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
        let payload = Object.assign(doc.data(), { id: doc.id, ref: doc.ref });
        return payload;
      })
      console.log(this.orders);
      this.spinner.hide();
    });
  }
}
