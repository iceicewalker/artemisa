import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { onSnapshot, getDocs } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.page.html',
  styleUrls: ['./add-employee.page.scss'],
})
export class AddEmployeePage implements OnInit {

  form: FormGroup;
  @Input() data: any = null;
  @Input() myProfile: any = null;
  constructor(private spinner: NgxSpinnerService, private globals: Globals, private fb: FormBuilder, private userService: UserService, private alertService: AlertService, private modalController: ModalController) { }
  provs = this.globals.provincias;
  ranks = this.globals.rangos;
  cantones: any = [];

  ngOnInit() {
    this.createForm();
    if(this.data){
      this.form.removeControl('clave');
      this.form.removeControl('documentoTipo');
      this.form.removeControl('documentoValor');
      if(this.myProfile)
        this.form.removeControl('rango');
      else
        this.form.controls['rango'].setValue(this.data?.rango);
      this.form.controls['nombre'].setValue(this.data?.nombre);
      this.form.controls['apellido'].setValue(this.data?.apellido);
      this.form.controls['email'].setValue(this.data?.email);
      this.form.controls['foto'].setValue(this.data?.foto);
      this.form.controls['telefono'].setValue(this.data?.telefono);
      this.form.controls['provincia'].setValue(this.data?.provincia); this.setCantones();
      this.form.controls['canton'].setValue(this.data?.canton);
      this.form.controls['direccion'].setValue(this.data?.direccion);
    }
  }

  generatePassword(){
    this.form.controls['clave'].setValue(Math.random().toString(36).slice(-12));
  }

  createForm(){
    this.form = this.fb.group({ "documentoTipo": ["", [Validators.required]],
      "documentoValor": ["", [Validators.required, this.userService.idValidator]],
      "nombre": ["", [Validators.required]],
      "apellido": ["", [Validators.required]],
      "email": ["", [Validators.required]],
      "telefono": ["", [Validators.required]],
      "provincia": ["", [Validators.required]],
      "canton": ["", [Validators.required]],
      "clave": ["", [Validators.required]],
      "foto": ["", [Validators.required]],
      "rango": ["", [Validators.required]],
      "direccion": ["", [Validators.required]] });
  }         
  onFileSelected(event) {
    const storage = getStorage();
    // Create a storage reference from our storage service
    var n = Date.now();
    const file = event.target.files[0];
    if (file) {
      this.spinner.show();
      const filePath = 'empleados/' + n + Math.floor(Math.random() * 100000001);;
      const fileRef = ref(storage, filePath);
      const task = uploadBytesResumable(fileRef, file);
      task.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              //console.log('Upload is paused');
              break;
            case 'running':
              //console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          this.form.controls['foto'].setValue(""); 
          this.spinner.hide();
          // Handle unsuccessful uploads
        }, () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(task.snapshot.ref).then((downloadURL) => { this.form.controls['foto'].setValue(downloadURL);this.spinner.hide();});
        }
      );
    } else {
      this.form.controls['foto'].setValue(""); 
    }
  }
  
  setCantones(){
    this.cantones = this.provs.find((p) => p.id === this.form.value['provincia'])['datos'];
    this.form.controls['canton'].setValue("");
  }      
  
  async submit(){
    this.spinner.show();
    if(this.form.valid){
      var payload = this.form.value;
      payload.rango = Number(payload.rango)
      if(this.data){
        payload.id = this.data['id'];
        this.userService.set(payload).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El empleado se ha actualizado con éxito.' });
          this.form.reset();
          this.modalController.dismiss();
          this.spinner.hide();
        }).catch((e) => {
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
          this.spinner.hide();
        });
      }else{
        const querySnapshot = await getDocs(this.userService.getByPar("documentoValor", payload?.documento.valor));
        if(querySnapshot.empty){
          const app2 = initializeApp(environment.firebaseConfig, "Secondary");
          const auth2 = getAuth(app2);
          createUserWithEmailAndPassword(auth2, this.form.value['email'], this.form.value['clave'])
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              payload.id = user.uid;
              this.userService.set(payload).then((r) => {
                this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El empleado se ha registrado con éxito.' });
                this.form.reset();
                this.spinner.hide();
                auth2.signOut();
              })
            })
            .catch((error) => {
              var errorTemp = (error.code).split("/");
              if(errorTemp[0] == "auth") 
                this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: this.globals.authErrors[errorTemp[1]] });
              else
                this.alertService.toast({ icon: 'error', title: "¡Ha ocurrido un error!", text: 'Vuelve a intentar realizar la misma acción dentro de unos minutos, si no funciona, habla con un administrador.' });
              this.spinner.hide();
            });
        }else{
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Ya existe un empleado registrado con ese documento.' });
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
