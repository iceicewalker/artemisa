import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { onSnapshot, getDocs, FieldValue, arrayUnion } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
})
export class StockPage implements OnInit {

  @Input() data: any = null;
  @Input() type: any = null;
  public form: FormGroup;
  
  constructor(private spinner: NgxSpinnerService, private fb: FormBuilder, private productService: ProductService, private alertService: AlertService, private modalController: ModalController) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      "stock": ["", [Validators.required, Validators.min(1)]],
      "descripcion": [""],
      "costo": ["", [Validators.required, Validators.min(0)]]
    });
  }    

  async submit(){
    this.spinner.show();
    if(this.form.valid){
      let mov = {
        stock: this.form.value.stock * Number(this.type),
        costo: Number(this.form.value.costo),
        descripcion: this.form.value.descripcion,
        fecha: new Date()
      }
      var payload = {
        stock: this.form.value.stock * Number(this.type) + this.data.stock,
        movimientos: arrayUnion(mov),
        id: this.data['id']
      };
      if(this.data){
        this.productService.set(payload).then((r) => {
          if(payload.stock <= this.data.stockMinimo){
            this.productService.sendWhatsapp('stock_bajo', [{"type": "text", "text": ''}, {"type": "text", "text": this.data.sku}, {"type": "text", "text": payload.stock}]);
          }
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El producto se ha actualizado con éxito.' });
          this.form.reset();
          this.modalController.dismiss();
          this.spinner.hide();
        }).catch((e) => {
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
          this.spinner.hide();
        });
      }else{
        this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Ya existe un producto registrado con ese SKU.' });
        this.spinner.hide();
      }
    }else{
      this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Debes completar todos los campos para poder ingresar.' })
      this.form.markAllAsTouched();
      this.spinner.hide();
    }
  }
  
  closeModal(){ //Close the modal
    this.modalController.dismiss();
  }

}
