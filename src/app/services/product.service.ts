import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`
    };
  }

  // Listar produtos públicos
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  // Buscar produto por ID (seller)
  getProductById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/seller/products/${id}`, {
    headers: this.getAuthHeaders()
  });
  }

  // Criar produto
  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Atualizar produto
  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/seller/products/${id}`, data, {
      headers: this.getAuthHeaders()
    });
  }

  // Excluir produto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/seller/products/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Produtos do seller logado
  myProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/seller/products`, {
      headers: this.getAuthHeaders()
    });
  }
  
  // Admin logado Produtos  
  getAdminProducts(): Observable<any> {
  return this.http.get(`${this.apiUrl}/admin/products`, {
    headers: this.getAuthHeaders()
  });
}

}