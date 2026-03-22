import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service'; // 👈 IMPORTANTE

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class AppComponent implements OnInit {

  cartCount = 0;

  constructor(
    public authService: AuthService,
    private router: Router,
    private cartService: CartService // 👈 aqui
  ) {}

  ngOnInit() {
    this.loadCartCount();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  loadCartCount() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cartCount = res?.items?.length || 0;
      },
      error: () => {
        this.cartCount = 0;
      }
    });
  }

  goToDashboard() {
    const user = this.authService.getUser();
    if (!user) return;

    if (user.role === 'admin') {
      this.router.navigate(['/dashboard-admin']);
    } else if (user.role === 'seller') {
      this.router.navigate(['/dashboard-seller']);
    } else {
      this.router.navigate(['/dashboard-customer']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.authService.logout().subscribe();
    this.router.navigate(['/login']);
  }
}