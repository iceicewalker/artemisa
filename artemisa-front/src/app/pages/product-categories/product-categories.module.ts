import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductCategoriesPageRoutingModule } from './product-categories-routing.module';

import { ProductCategoriesPage } from './product-categories.page';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductCategoriesPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    FilterPipeModule
  ],
  declarations: [ProductCategoriesPage]
})
export class ProductCategoriesPageModule {}
