import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../customers/customers.module').then( m => m.CustomersPageModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then( m => m.CustomersPageModule)
      },
      {
        path: 'add-customer',
        loadChildren: () => import('../add-customer/add-customer.module').then( m => m.AddCustomerPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: 'add-category',
        loadChildren: () => import('../add-category/add-category.module').then( m => m.AddCategoryPageModule)
      },
      {
        path: 'add-inventory',
        loadChildren: () => import('../add-inventory/add-inventory.module').then( m => m.AddInventoryPageModule)
      },
      {
        path: 'add-order',
        loadChildren: () => import('../add-order/add-order.module').then( m => m.AddOrderPageModule)
      },
      {
        path: 'add-employee',
        loadChildren: () => import('../add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('../employees/employees.module').then( m => m.EmployeesPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('../inventory/inventory.module').then( m => m.InventoryPageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule)
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
