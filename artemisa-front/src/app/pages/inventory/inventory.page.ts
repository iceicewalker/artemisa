import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  counter: any = { p: 0, c: 0, t: 0 }
  constructor() { }

  ngOnInit() {
  }

}
