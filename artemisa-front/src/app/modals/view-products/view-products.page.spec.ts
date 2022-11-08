import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ViewProductsPage } from './view-products.page';

describe('ViewProductsPage', () => {
  let component: ViewProductsPage;
  let fixture: ComponentFixture<ViewProductsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProductsPage],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, NgxPaginationModule, NgxSpinnerModule, OrderModule, FilterPipeModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
