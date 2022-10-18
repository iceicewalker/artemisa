import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { getDocs, onSnapshot } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.page.html',
  styleUrls: ['./add-customer.page.scss'],
})
export class AddCustomerPage implements OnInit {

  form: FormGroup;
  @Input() data: any = null;
  constructor(private spinner: NgxSpinnerService, private globals: Globals, private fb: FormBuilder, private customerService: CustomerService, private userService: UserService, private alertService: AlertService, private modalController: ModalController) { }
  provs = this.globals.provincias;
  categories: any = [];
  cantones: any = [];

  ngOnInit() {
    this.spinner.show();
    this.createForm();
    this.getCategories();
    if(this.data){
      this.form.controls['documentoTipo'].setValue(this.data?.documento.tipo + "");
      this.form.controls['documentoValor'].setValue(this.data?.documento.valor);
      this.form.controls['nombre'].setValue(this.data?.nombre);
      this.form.controls['apellido'].setValue(this.data?.apellido);
      this.form.controls['email'].setValue(this.data?.email);
      this.form.controls['telefono'].setValue(this.data?.telefono);
      this.form.controls['categoria'].setValue(this.data?.categoria);
      this.form.controls['provincia'].setValue(this.data?.provincia); this.setCantones();
      this.form.controls['canton'].setValue(this.data?.canton);
      this.form.controls['direccion'].setValue(this.data?.direccion);
    }
  }

  getCategories(){
    const q = this.userService.getCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.categories = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) });
      this.spinner.hide();
    });
  }

  createForm(){
    this.form = this.fb.group({ "documentoTipo": ["", [Validators.required]],
      "documentoValor": ["", [Validators.required, this.userService.idValidator]],
      "nombre": ["", [Validators.required]],
      "apellido": ["", [Validators.required]],
      "email": ["", [Validators.required]],
      "telefono": ["", [Validators.required]],
      "categoria": ["", [Validators.required]],
      "provincia": ["", [Validators.required]],
      "canton": ["", [Validators.required]],
      "direccion": ["", [Validators.required]] });
  }          

  setCantones(){
    this.cantones = this.provs.find((p) => p.id === this.form.value['provincia'])['datos'];
    this.form.controls['canton'].setValue("");
  }      
  
  async submit(){
    this.spinner.show();
    if(this.form.valid){
      var payload = Object.assign(this.form.value, {id: this.data['id'], documento: { tipo: Number(this.form.value?.documentoTipo), valor: this.form.value?.documentoValor }});
      if(this.data){
        this.customerService.set(payload).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El cliente se ha actualizado con éxito.' });
          this.spinner.hide();
        }).catch((e) => {
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
          this.spinner.hide();
        });
      }else{
        const querySnapshot = await getDocs(this.customerService.getByPar("documento.valor", payload?.documento.valor));
        if(querySnapshot.empty){
          this.customerService.add(payload).then((r) => {
            if(r?.id)
              this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El cliente se ha registrado con éxito.' });
            else
              this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
            this.spinner.hide();
          })
        }else{
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Ya existe un cliente registrado con ese documento.' });
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
