import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Globals } from 'src/app/globals';
import { AlertService } from '../alert/alert.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = getAuth();

  constructor(public router: Router, public ngZone: NgZone, private userService: UserService, private alertService: AlertService, private globals: Globals) { }

  get getUserId(): string {
    return this.auth.currentUser.uid;
  }
  register(email, password, name, phoneNumber, country, rank){ //Register function
    createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
      // The signed-in user info.
      const user = userCredential.user;
      var uid = user.uid;
      var userData;
      userData = {
        id: uid,
        nombre: name,
        correo: user.email,
        pais: country,
        telefono: phoneNumber,
        tipo: rank,
        fechaRegistro: new Date()
      };
      updateProfile(user, { displayName: name });
      this.userService.set(userData).then(() => { 
        this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'Se ha registrado la cuenta satisfactoriamente.' }); 
      })
    })
    .catch((err) => {
      var errorTemp = (err.code).split("/");
      if(errorTemp[0] == "auth") 
        this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: errorTemp[1] });
      else
        this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: 'Vuelve a intentar realizar la misma acción dentro de unos minutos, si no funciona, habla con un administrador.' });
        return false;
    });
  }

  logIn(email, password){ //Login function
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      this.alertService.toast({ icon: 'success', title: '¡Bienvenido del vuelta!', text: 'Nos alegra volver a verte.' });
    })
    .catch((error) => {
      var errorTemp = (error.code).split("/");
      if(errorTemp[0] == "auth") 
        this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: this.globals.authErrors[errorTemp[1]] });
      else
        this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: 'Vuelve a intentar realizar la misma acción dentro de unos minutos, si no funciona, habla con un administrador.' });
    });
  }

  signOut() { //Signout function
    this.alertService.fire({
      title: '¿Estas seguro de cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: 'rgb(255 0 0)',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.signOut().then(() => {
          localStorage.removeItem('user');
          this.alertService.toast({
            icon: 'success',
            title: '¡Haz cerrado sesión con éxito!',
            text: 'Esperamos que vuelvas pronto :)'
          });
        }).catch((e) => {
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos momentos...' });
        });
      }
    });
  }
}
