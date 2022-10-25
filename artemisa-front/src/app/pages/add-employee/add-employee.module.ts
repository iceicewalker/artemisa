import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmployeePageRoutingModule } from './add-employee-routing.module';

import { AddEmployeePage } from './add-employee.page';
import { ShowHidePasswordPageModule } from 'src/app/components/show-hide-password/show-hide-password.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    AddEmployeePageRoutingModule,
    ReactiveFormsModule,
    ShowHidePasswordPageModule
  ],
  declarations: [AddEmployeePage]
})
export class AddEmployeePageModule {}
