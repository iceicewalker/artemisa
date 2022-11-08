import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
  @Input() data: any = null;
  constructor(private modal: ModalController) { }

  ngOnInit() {
  } 
  public captureScreen()  //Generates the pdf file for the invoice
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(`NOTA_VENTA_${this.data.id}.pdf`); // Generated PDF   
    });  
  }  
  closeModal(){ //Close the modal
    this.modal.dismiss();
  }

}
