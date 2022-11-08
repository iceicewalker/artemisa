import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Globals } from 'src/app/globals';

import { AddCustomerPage } from './add-customer.page';

describe('AddCustomerPage', () => {
  let component: AddCustomerPage;
  let fixture: ComponentFixture<AddCustomerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerPage ],
      imports: [IonicModule.forRoot(), NgxSpinnerModule, ReactiveFormsModule, HttpClientModule ],
      providers: [Globals]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
});
