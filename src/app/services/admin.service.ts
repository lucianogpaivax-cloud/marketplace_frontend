import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8000/api'; // ajuste se necessário

  constructor(private http: HttpClient) {}

  getSellers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/sellers`);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/customers`);
  }

  deleteSeller(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/sellers/${id}`);
  }

  updateSeller(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/sellers/${id}`, data);
  }
}