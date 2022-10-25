import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOrderPageRoutingModule } from './add-order-routing.module';

import { AddOrderPage } from './add-order.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOrderPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    OrderModule,
    FilterPipeModule
  ],
  declarations: [AddOrderPage]
})
export class AddOrderPageModule {}
