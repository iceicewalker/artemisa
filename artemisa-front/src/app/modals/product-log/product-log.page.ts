import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.page.html',
  styleUrls: ['./product-log.page.scss'],
})
export class ProductLogPage implements OnInit {

  counter: any = { p: 0, c: 0, t: 0 }
  @Input() data: any = null;
  p: number = 1; 
  isDescOrder: boolean = true;
  orderHeader: String ='';
  sortDirection = 1;
  searchInput: any = { };
  filter: any = "";
  
  constructor(private modal: ModalController) { }

  ngOnInit() {
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
