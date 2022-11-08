import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product-log',
  templateUrl: './product-log.page.html',
  styleUrls: ['./product-log.page.scss'],
})
export class ProductLogPage implements OnInit {

  @Input() data: any = null;
  public counter: any = { p: 0, c: 0, t: 0 }
  public p: number = 1; 
  public isDescOrder: boolean = true;
  public orderHeader: String ='';
  public sortDirection = 1;
  public searchInput: any = { };
  public filter: any = "";
  
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
  closeModal(){ //Close the modal
    this.modal.dismiss();
  }

}
