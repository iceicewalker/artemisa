import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

 
  forgotForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private alertService: AlertService, private globals: Globals) { }

  ngOnInit() {
    this.forgotBuilder();
  }

  forgotBuilder(){ //Form
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submitForgot(){ //Submit the requirement to restore the password if the form is valid.
    if(this.forgotForm.valid){
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.forgotForm.value.email).then((r) => {
        this.alertService.toast({title: "¡Correo envíado con éxito!", text: "Se ha enviado a tu correo un enlace desde el cual podrás recuperar tu contraseña, si no lo encuentras, revisalo en la bandeja de spam.", icon: "success"})
        this.forgotForm.reset();
        this.dismiss();
      }).catch((e) => {
        var errorTemp = (e.code).split("/");
        if(errorTemp[0] == "auth")
          this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: this.globals.authErrors[errorTemp[1]] });
        else
          this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: 'Vuelve a intentar realizar la misma acción dentro de unos minutos, si no funciona, habla con un administrador.' });
      })
    
    }else{
      this.forgotForm.markAllAsTouched();
      this.alertService.toast({title: "¡Lo sentimos, ha ocurrido un error!", text: "Debes completar todos los campos correctamente.", icon: 'error'});
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }

}
