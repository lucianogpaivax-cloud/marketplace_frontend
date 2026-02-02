import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  // Listar produtos (público)
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Criar produto (seller)
  createProduct(data: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post(this.apiUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Atualizar produto (seller/admin)
  updateProduct(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.put(`${this.apiUrl}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Excluir produto (seller/admin)
  deleteProduct(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Produtos do seller logado
  myProducts(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.apiUrl}/my-products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
