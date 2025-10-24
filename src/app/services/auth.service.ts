import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/'; // URL do Laravel

  constructor(private http: HttpClient) { }

  // Registro de usuário
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // Logout
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Obter dados do usuário logado
  me(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/me`, { headers });
  }

  // Salvar token no localStorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Recuperar token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar se está logado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}