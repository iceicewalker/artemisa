import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Globals } from 'src/app/globals';

import { AddCategoryPage } from './add-category.page';

describe('AddCategoryPage', () => {
  let component: AddCategoryPage;
  let fixture: ComponentFixture<AddCategoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCategoryPage ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, NgxPaginationModule, NgxSpinnerModule, OrderModule, FilterPipeModule ],
      providers: [Globals]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
