import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { onSnapshot, getDocs } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.page.html',
  styleUrls: ['./add-product-category.page.scss'],
})
export class AddProductCategoryPage implements OnInit {

  form: FormGroup;
  @Input() data: any = null;
  constructor(private spinner: NgxSpinnerService, private globals: Globals, private fb: FormBuilder, private categoryService: ProductService, private alertService: AlertService, private modalController: ModalController) { }
  provs = this.globals.provincias;
  categories: any = [];

  ngOnInit() {
    this.createForm();
    if(this.data){
      this.form.controls['nombre'].setValue(this.data?.nombre);
    }
  }
  createForm(){
    this.form = this.fb.group({ "nombre": ["", [Validators.required]] });
  }          
  
  async submit(){
    this.spinner.show();
    if(this.form.valid){
      var payload = Object.assign(this.form.value, {nombreMin: this.form.value['nombre'].toLowerCase()});
      if(this.data){
        payload.id = this.data['id'];
        this.categoryService.setCategory(payload).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'La categoría se ha actualizado con éxito.' });
          this.form.reset();
          this.modalController.dismiss();
          this.spinner.hide();
        }).catch((e) => {
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
          this.spinner.hide();
        });
      }else{
        const querySnapshot = await getDocs(this.categoryService.getCategoryByPar("nombreMin", payload?.nombreMin));
        if(querySnapshot.empty){
          this.categoryService.addCategory(payload).then((r) => {
            if(r?.id){
              this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'La categoría se ha registrado con éxito.' });
              this.form.reset();
            }
            else
              this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
            this.spinner.hide();
          })
        }else{
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Ya existe una categoría registrado con ese nombre.' });
          this.spinner.hide();
        }
      }
    }else{
      this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Debes completar todos los campos para poder ingresar.' })
      this.form.markAllAsTouched();
      this.spinner.hide();
    }
  }
  

}
