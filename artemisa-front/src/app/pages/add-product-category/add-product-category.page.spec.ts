import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Globals } from 'src/app/globals';

import { AddProductCategoryPage } from './add-product-category.page';

describe('AddProductCategoryPage', () => {
  let component: AddProductCategoryPage;
  let fixture: ComponentFixture<AddProductCategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductCategoryPage ],
      imports: [IonicModule.forRoot(), FormsModule, NgxSpinnerModule, ReactiveFormsModule, NgxCurrencyModule, HttpClientModule ],
      providers: [Globals]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
