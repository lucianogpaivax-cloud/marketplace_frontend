import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-selfedit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './customer-selfedit.component.html'
})
export class CustomerSelfeditComponent implements OnInit {

  customer: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCustomer();
  }

  loadCustomer() {
    const token = localStorage.getItem('token');

    if (!token) return;

    this.http.get<any>('http://localhost:8000/api/customer/me', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(res => this.customer = res);
  }

  updateCustomer() {
    const token = localStorage.getItem('token');

    if (!token) return;

    this.http.put('http://localhost:8000/api/customer/update', this.customer, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => {
      alert('Dados atualizados com sucesso!');
    });
  }
}

