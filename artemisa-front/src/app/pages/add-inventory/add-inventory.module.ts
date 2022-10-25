import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInventoryPageRoutingModule } from './add-inventory-routing.module';

import { AddInventoryPage } from './add-inventory.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    AddInventoryPageRoutingModule
  ],
  declarations: [AddInventoryPage]
})
export class AddInventoryPageModule {}
