import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShowHidePasswordPageModule } from 'src/app/components/show-hide-password/show-hide-password.module';
import { Globals } from 'src/app/globals';

import { AddEmployeePage } from './add-employee.page';

describe('AddEmployeePage', () => {
  let component: AddEmployeePage;
  let fixture: ComponentFixture<AddEmployeePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeePage ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, NgxPaginationModule, NgxSpinnerModule, OrderModule, FilterPipeModule, ShowHidePasswordPageModule ],
      providers: [Globals]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
