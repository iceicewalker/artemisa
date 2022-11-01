import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankGuard } from 'src/app/guards/rank/rank.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then( m => m.CustomersPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'add-customer',
        loadChildren: () => import('../add-customer/add-customer.module').then( m => m.AddCustomerPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then( m => m.CategoriesPageModule),
        canActivate: [RankGuard], data: { ranks: [1] }
      },
      {
        path: 'add-category',
        loadChildren: () => import('../add-category/add-category.module').then( m => m.AddCategoryPageModule),
        canActivate: [RankGuard], data: { ranks: [1] }
      },
      {
        path: 'add-inventory',
        loadChildren: () => import('../add-inventory/add-inventory.module').then( m => m.AddInventoryPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'add-order',
        loadChildren: () => import('../add-order/add-order.module').then( m => m.AddOrderPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'add-employee',
        loadChildren: () => import('../add-employee/add-employee.module').then( m => m.AddEmployeePageModule),
        canActivate: [RankGuard], data: { ranks: [1] }
      },
      {
        path: 'employees',
        loadChildren: () => import('../employees/employees.module').then( m => m.EmployeesPageModule),
        canActivate: [RankGuard], data: { ranks: [1] }
      },
      {
        path: 'orders',
        loadChildren: () => import('../orders/orders.module').then( m => m.OrdersPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'inventory',
        loadChildren: () => import('../inventory/inventory.module').then( m => m.InventoryPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'add-product-category',
        loadChildren: () => import('../add-product-category/add-product-category.module').then( m => m.AddProductCategoryPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'product-categories',
        loadChildren: () => import('../product-categories/product-categories.module').then( m => m.ProductCategoriesPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      },
      {
        path: 'stock',
        loadChildren: () => import('../../modals/stock/stock.module').then( m => m.StockPageModule),
        canActivate: [RankGuard], data: { ranks: [1, 2] }
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
