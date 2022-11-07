import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordPage } from 'src/app/modals/forgot-password/forgot-password.page';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  constructor(private cdr: ChangeDetectorRef, private fb: FormBuilder, private alertService: AlertService, private authService: AuthService, private modalController: ModalController) {
    this.createLoginForm();
  }

  ngOnInit() {
  }

  login(){ //Validates login form
    var email = this.loginForm.value['email'];
    var password = this.loginForm.value['password'];
    if(this.loginForm.valid){
      this.authService.logIn(email, password);
    }else{
      this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Debes completar todos los campos para poder ingresar.' })
      this.loginForm.markAllAsTouched();
    }
  }
  
  createLoginForm(){
    this.loginForm = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.required]]
    });
  }


  async forgot(){
    const modal = await this.modalController.create({component: ForgotPasswordPage});
    modal.present();

  }
}
