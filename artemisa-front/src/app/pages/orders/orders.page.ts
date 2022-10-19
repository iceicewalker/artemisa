import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  counter: any = { p: 0, c: 0, t: 0 }
  constructor() { }

  ngOnInit() {
  }

}
