import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-list',
  standalone: true,
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class SellerListComponent implements OnInit {
  vendedores: any[] = [];
  dataSource: any[] = [];   // <-- ADICIONADO
  loading = true;
  error = '';
  displayedColumns: string[] = ['id_seller', 'nome_loja', 'tipo_loja', 'origem', 'actions'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSellers();
  }

  fetchSellers() {
    this.loading = true;

    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;
    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .get('http://localhost:8000/api/admin/sellers', { headers })
      .subscribe({
        next: (data: any) => {
          this.vendedores = data;
          this.dataSource = data;   // <-- ADICIONADO (necessário para o mat-table)
          this.loading = false;
        },
        error: () => {
          this.error = 'Erro ao carregar vendedores.';
          this.loading = false;
        },
      });
  }
  
  deleteSeller(id_seller: number) {
  if (!confirm("Tem certeza que deseja excluir este vendedor?")) return;

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  const headers = { Authorization: `Bearer ${token}` };

  this.http
    .delete(`http://localhost:8000/api/admin/sellers/${id_seller}`, { headers })
    .subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter(s => s.id_seller !== id_seller);
        alert("Vendedor excluído com sucesso!");
      },
      error: () => {
        alert("Erro ao excluir vendedor.");
      }
    });
  }
}

