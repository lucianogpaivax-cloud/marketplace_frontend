import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-seller',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './dashboard-seller.component.html'
})
export class DashboardSellerComponent implements OnInit {

  user: any = {};
  seller: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const token = localStorage.getItem('token');

    this.http.get<any>('http://localhost:8000/api/seller/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(res => {
      this.user = res.user;
      this.seller = res.seller;
    });
  }
}
