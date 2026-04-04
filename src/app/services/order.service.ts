import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // CHECKOUT (criar pedido)
  checkout(data: any): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/checkout`,
    data,
    { headers: this.getAuthHeaders() }
  );
}

  // LISTAR PEDIDOS DO USUÁRIO
  getMyOrders(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/orders`,
      { headers: this.getAuthHeaders() }
    );
  }

  // DETALHE DE UM PEDIDO
  getOrderById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/orders/${id}`,
      { headers: this.getAuthHeaders() }
    );
  }

  // CANCELAR PEDIDO (opcional)
  cancelOrder(id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/orders/${id}/cancel`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  
}