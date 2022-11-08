import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Globals } from 'src/app/globals';

import { AddInventoryPage } from './add-inventory.page';

describe('AddInventoryPage', () => {
  let component: AddInventoryPage;
  let fixture: ComponentFixture<AddInventoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInventoryPage ],
      imports: [IonicModule.forRoot(), FormsModule, NgxSpinnerModule, ReactiveFormsModule, NgxCurrencyModule, HttpClientModule ],
      providers: [Globals]
    }).compileComponents();

    fixture = TestBed.createComponent(AddInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

});
