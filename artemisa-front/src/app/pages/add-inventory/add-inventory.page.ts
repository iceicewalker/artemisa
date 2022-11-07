import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { onSnapshot, getDocs } from 'firebase/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage implements OnInit {

  form: FormGroup;
  @Input() data: any = null;
  @Input() myProfile: any = null;
  constructor(private spinner: NgxSpinnerService, private globals: Globals, private fb: FormBuilder, private productService: ProductService, private alertService: AlertService, private modalController: ModalController) { }
  provs = this.globals.provincias;
  ranks = this.globals.rangos;
  categories: any = [];

  ngOnInit() {
    this.createForm();
    this.getCategories();
    if(this.data){
      this.form.removeControl('stock');
      this.form.controls['sku'].setValue(this.data?.sku);
      this.form.controls['nombre'].setValue(this.data?.nombre);
      this.form.controls['descripcion'].setValue(this.data?.descripcion);
      this.form.controls['costo'].setValue(this.data?.costo);
      this.form.controls['precio'].setValue(this.data?.precio);
      this.form.controls['categoria'].setValue(this.data?.categoria);
      this.form.controls['stockMinimo'].setValue(this.data?.stockMinimo);
      this.form.controls['stockMedio'].setValue(this.data?.stockMedio);
      this.form.controls['foto'].setValue(this.data?.foto);
    }
  }

  getCategories(){ //Gets the categories of inventory products.
    const q = this.productService.getProductCategoryQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.categories = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) });
      this.spinner.hide();
    });
  }

  createForm(){ //Creates the form
    this.form = this.fb.group({
      "sku": ["", [Validators.required]],
      "nombre": ["", [Validators.required]],
      "descripcion": ["", [Validators.required]],
      "costo": ["", [Validators.required, Validators.min(0)]],
      "precio": ["", [Validators.required, Validators.min(0)]],
      "categoria": ["", [Validators.required]],
      "stock": ["", [Validators.required, Validators.min(0)]],
      "stockMinimo": ["", [Validators.required, Validators.min(1)]],
      "stockMedio": ["", [Validators.required, Validators.min(2)]],
      "foto": ["", [Validators.required]] });
  }         
  onFileSelected(event) { //Upload a file
    const storage = getStorage();
    // Create a storage reference from our storage service
    var n = Date.now();
    const file = event.target.files[0];
    if (file) {
      this.spinner.show();
      const filePath = 'productos/' + n + Math.floor(Math.random() * 100000001);;
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
  
  async submit(){ //Checks if the form is valid, and set the required information.
    this.spinner.show();
    if(this.form.valid){
      var payload = this.form.value;
      if(this.data){
        payload.id = this.data['id'];
        this.productService.set(payload).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El producto se ha actualizado con éxito.' });
          this.form.reset();
          this.modalController.dismiss();
          this.spinner.hide();
        }).catch((e) => {
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Vuelve a intentarlo en unos minutos.' })
          this.spinner.hide();
        });
      }else{
        const querySnapshot = await getDocs(this.productService.getByPar("sku", payload?.sku)); 
        if(querySnapshot.empty){ //Validate that there is not a product with the same SKU.
          this.productService.add(payload).then((r) => {
            this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El producto se ha registrado con éxito.' });
            this.form.reset();
            this.spinner.hide();
          })
        }else{
          this.alertService.toast({ icon: 'error', title: '¡Ha ocurrido un error!', text: 'Ya existe un producto registrado con ese SKU.' });
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
