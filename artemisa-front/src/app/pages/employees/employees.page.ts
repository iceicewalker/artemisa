import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { onSnapshot } from 'firebase/firestore';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddEmployeePage } from '../add-employee/add-employee.page';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  p: number = 1; 
  isDescOrder: boolean = true;
  orderHeader: String ='';
  sortDirection = 1;
  searchInput: any = { nombre: '', apellido: '' };
  users: any;
  
  constructor(private userService: UserService,  private alertService: AlertService, private modal: ModalController) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    const q = this.userService.getQuery();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      this.users = querySnapshot.docs.map((doc) => { return Object.assign(doc.data(), { id: doc.id, ref: doc.ref }) })
    });
  }

  async modify(user){
    const modal = await this.modal.create({
      component: AddEmployeePage,
      componentProps: {data: user},
      cssClass: 'evaluate-modal'
    });
    modal.present();
  } 

  delete(user){
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
