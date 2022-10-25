import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { NgxCurrencyModule } from "ngx-currency";

import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import {trigger,state,style,animate,transition}from '@angular/animations';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgxPaginationModule, HttpClientModule, OrderModule, FilterPipeModule, BrowserAnimationsModule, NgxCurrencyModule, NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }) ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Globals],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
