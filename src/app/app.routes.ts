import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent
  },

  {
    path: 'admin/sellers',
    loadComponent: () =>
      import('./pages/admin/seller-list/seller-list.component')
        .then(m => m.SellerListComponent)
  },

  {
  path: 'admin/customers',
  loadComponent: () =>
    import('./pages/admin/customer-list/customer-list.component')
      .then(m => m.CustomerListComponent)
  },

  {
  path: 'admin/customers/edit/:id',
  loadComponent: () =>
    import('./pages/admin/customer-edit/customer-edit.component')
      .then(m => m.CustomerEditComponent)
  }
];