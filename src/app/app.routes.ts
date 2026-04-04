import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
/* import { DashboardComponent } from './pages/dashboard/dashboard.component'; */
import { DashboardAdminComponent } from './pages/dashboard/dashboard-admin/dashboard-admin.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { SellerGuard } from './guards/seller.guard';
import { EditProductComponent } from './pages/seller/products/edit-product/edit-product.component';
import { AdminProductsListComponent } from './pages/admin/admin-products-list/admin-products-list.component';
import { ProductsHomeComponent } from './pages/products/products-home/products-home.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component'
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'


export const routes: Routes = [
  { path: '', component: ProductsHomeComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* {
    path: 'dashboard',
    component: DashboardComponent
  }, */

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
    import('./pages/customer/customer-edit/customer-edit.component')
      .then(m => m.CustomerEditComponent)
  },

  {
  path: 'admin/products',
  component: AdminProductsListComponent
  },

  {
  path: 'dashboard-customer',
  loadComponent: () =>
    import('./pages/customer/dashboard-customer/dashboard-customer.component')
      .then(m => m.DashboardCustomerComponent)
  },
  
  {
  path: 'customer/edit',
  loadComponent: () =>
    import('./pages/customer/dashboard-customer/customer-selfedit/customer-selfedit.component')
      .then(m => m.CustomerSelfeditComponent)
  },

  {
  path: 'dashboard-seller',
  loadComponent: () =>
    import('./pages/seller/dashboard-seller/dashboard-seller.component')
      .then(m => m.DashboardSellerComponent)
  },

  {
  path: 'seller/edit',
  loadComponent: () =>
    import('./pages/seller/seller-selfedit/seller-selfedit.component')
      .then(m => m.SellerSelfeditComponent)
  },

  {
    path: 'seller/products/create',
    component: CreateProductComponent,
    canActivate: [SellerGuard]
  },

  {
  path: 'seller/products',
  loadComponent: () =>
    import('./pages/seller/products/seller-products/seller-products.component')
      .then(m => m.SellerProductsComponent),
  canActivate: [SellerGuard]
  },

  {
  path: 'seller/products/edit/:id',
  component: EditProductComponent
  },

  {
  path: 'admin/products/edit/:id',
  component: EditProductComponent
  },

  {
  path: 'products',
  component: ProductsHomeComponent
  },

  {
  path: 'products/:id',
  loadComponent: () =>
    import('./pages/products/product-details/product-details.component')
      .then(m => m.ProductDetailsComponent)
  },

  {
  path: 'cart',
  loadComponent: () =>
    import('./pages/cart/cart.component')
      .then(m => m.CartComponent)
  },

 //  pedidos do usuário
  {
    path: 'orders',
    component: OrdersComponent
  },

  // detalhe do pedido
  {
    path: 'orders/:id',
    component: OrderDetailComponent
  },

  {
  path: 'checkout',
  loadComponent: () =>
    import('./pages/checkout/checkout.component')
      .then(m => m.CheckoutComponent)
}

];