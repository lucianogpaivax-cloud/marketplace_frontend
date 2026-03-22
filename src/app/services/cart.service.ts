import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  private apiUrl = 'http://localhost:8000/api';
  cartService: any;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    };
  }

  addToCart(product_id: number) {
  return this.http.post(`${this.apiUrl}/cart/add`, {
    product_id
  }, {
    headers: this.getHeaders()
  });
}

  getCart() {
    return this.http.get(`${this.apiUrl}/cart`, {
      headers: this.getHeaders()
    });
  }

  clearCart() {
  return this.http.delete(`${this.apiUrl}/cart/clear`, {
    headers: this.getHeaders()
  });
}

  removeItem(id: number) {
  return this.http.delete(`${this.apiUrl}/cart/item/${id}`, {
    headers: this.getHeaders()
  });
}
}

