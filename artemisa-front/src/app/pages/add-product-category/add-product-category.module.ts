import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductCategoryPageRoutingModule } from './add-product-category-routing.module';

import { AddProductCategoryPage } from './add-product-category.page';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    AddProductCategoryPageRoutingModule
  ],
  declarations: [AddProductCategoryPage]
})
export class AddProductCategoryPageModule {}
