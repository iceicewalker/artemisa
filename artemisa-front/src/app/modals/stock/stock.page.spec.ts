import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

import { StockPage } from './stock.page';

describe('StockPage', () => {
  let component: StockPage;
  let fixture: ComponentFixture<StockPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPage ],
      imports: [IonicModule.forRoot(), HttpClientModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, OrderModule, FilterPipeModule ],
    }).compileComponents();

    fixture = TestBed.createComponent(StockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
