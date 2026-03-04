import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-seller-selfedit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './seller-selfedit.component.html',
  styleUrls: ['./seller-selfedit.component.css']
})
export class SellerSelfeditComponent implements OnInit {

  user: any = {
    name: '',
    email: '',
    telefone: ''
  };

  seller: any = {
    nome_loja: '',
    tipo_loja: '',
    origem: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSeller();
  }

  loadSeller() {
    const token = localStorage.getItem('token');

    this.http.get<any>('http://localhost:8000/api/seller/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: res => {
        if (res.user) this.user = res.user;
        if (res.seller) this.seller = res.seller;
      },
      error: err => {
        console.error('Erro ao carregar perfil do seller', err);
      }
    });
  }

  updateSeller() {
    const token = localStorage.getItem('token');

    const payload = {
      name: this.user.name,
      email: this.user.email,
      telefone: this.user.telefone,
      nome_loja: this.seller.nome_loja,
      tipo_loja: this.seller.tipo_loja,
      origem: this.seller.origem
    };

    this.http.put(
      'http://localhost:8000/api/seller/update',
      payload,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).subscribe({
      next: () => {
        alert('Dados do seller atualizados com sucesso!');
      },
      error: err => {
        console.error('Erro ao atualizar seller', err);
        alert('Erro ao atualizar dados.');
      }
    });
  }
}
