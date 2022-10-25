import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCustomerPageRoutingModule } from './add-customer-routing.module';

import { AddCustomerPage } from './add-customer.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    AddCustomerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddCustomerPage]
})
export class AddCustomerPageModule {}
