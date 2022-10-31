import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewProductsPageRoutingModule } from './view-products-routing.module';

import { ViewProductsPage } from './view-products.page';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewProductsPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    OrderModule,
    FilterPipeModule
  ],
  declarations: [ViewProductsPage]
})
export class ViewProductsPageModule {}
