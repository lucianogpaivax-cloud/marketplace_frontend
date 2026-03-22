import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any;
  items: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        this.cart = res;
        this.items = res?.items || [];
        this.calculateTotal();
      },
      error: (err) => console.error(err)
    });
  }

  calculateTotal() {
    this.total = this.items.reduce((acc, item) => {
      return acc + (item.product.preco * item.quantity);
    }, 0);
  }

  removeItem(id: number) {
  console.log('Removendo item:', id); // TESTE

  this.cartService.removeItem(id).subscribe({
    next: () => {
      alert('Item removido!');
      this.loadCart(); // 🔄 atualiza lista
    },
    error: (err) => {
      console.log(err);
      alert('Erro ao remover');
    }
  });
}

  increase(item: any) {
    item.quantity++;
    this.calculateTotal();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.calculateTotal();
    }
  }
  
  clearCart() {
  this.cartService.clearCart().subscribe({
    next: () => {
      alert('Carrinho limpo!');
      this.loadCart(); // recarrega lista
    },
    error: () => {
      alert('Erro ao limpar');
    }
  });
}
}