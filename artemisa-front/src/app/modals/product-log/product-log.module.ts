import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductLogPageRoutingModule } from './product-log-routing.module';

import { ProductLogPage } from './product-log.page';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductLogPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    OrderModule,
    FilterPipeModule
  ],
  declarations: [ProductLogPage]
})
export class ProductLogPageModule {}
