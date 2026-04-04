import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;

  loading = false;
  error: string | null = null;

  // 💳 pagamento
  paymentMethod: string = 'pix';

  // 📍 endereço
  city: string = '';
  state: string = '';
  address: string = '';

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe((res: any) => {
      this.cartItems = res.items || [];

      this.total = this.cartItems.reduce(
        (sum, item) => sum + (item.quantity * item.product.preco),
        0
      );
    });
  }

  confirmCheckout() {
    this.error = null;

    if (!this.city || !this.state || !this.address) {
      this.error = 'Preencha todos os campos de endereço';
      return;
    }

    this.loading = true;

    const payload = {
      payment_method: this.paymentMethod,
      city: this.city,
      state: this.state,
      address: this.address
    };

    this.orderService.checkout(payload).subscribe({
      next: () => {
        this.loading = false;

        // limpa carrinho no front
        this.cartItems = [];

        // redireciona
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Erro ao finalizar pedido';
      }
    });
  }
}