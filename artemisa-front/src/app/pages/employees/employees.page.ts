import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { Globals } from 'src/app/globals';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddEmployeePage } from '../add-employee/add-employee.page';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  public p: number = 1; 
  public isDescOrder: boolean = true;
  public orderHeader: String ='';
  public sortDirection = 1;
  public searchInput: any = { nombre: '', apellido: '', rango: '', documentoValor: '' };
  public filter: any = "";
  public users: any;
  public categories = this.globals.rangos;
  public types: any = [{name: 'Nombre', id: 'nombre'}, {name: 'Apellido', id: 'apellido'}, {name: 'Documento', id: 'documentoValor'}, {name: 'Provincia', id: 'provincia'}, {name: 'Cantón', id: 'canton'}]
  
  constructor(private globals: Globals, private userService: UserService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){ //Load all employees from the database.
    const q = this.userService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) })
    });
  }

  async modify(user){ //Modifies employee info
    const modal = await this.modal.create({
      component: AddEmployeePage,
      componentProps: {data: user},
      cssClass: 'evaluate-modal'
    });
    modal.present();
  } 

  delete(user){ //Delete an employee
    this.alertService.fire({
      title: '¿Estás seguro de borrar el empleado?',
      text: 'Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(user.id).then((r) => {
          this.alertService.toast({ icon: 'success', title: '¡Buen trabajo!', text: 'El empleado se ha eliminado con éxito.' });
        })
      }
    });
  }

  sort(headerName){
    this.isDescOrder = !this.isDescOrder;
    if(this.isDescOrder)
      this.sortDirection = 1
    else
      this.sortDirection =2
    this.orderHeader = headerName;
  }

}
