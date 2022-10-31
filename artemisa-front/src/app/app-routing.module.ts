import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate: [AuthGuard], data: { logged: false }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modals/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), canActivate: [AuthGuard], data: { logged: true }
  },
  { path: '404', redirectTo: ''},
  { path: '**', redirectTo: ''},
  {
    path: 'product-log',
    loadChildren: () => import('./modals/product-log/product-log.module').then( m => m.ProductLogPageModule)
  },  {
    path: 'view-products',
    loadChildren: () => import('./modals/view-products/view-products.module').then( m => m.ViewProductsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
