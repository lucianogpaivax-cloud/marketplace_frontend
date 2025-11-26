import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router} from '@angular/router';


@Component({
  selector: 'app-customer-list',
  standalone: true,
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class CustomerListComponent implements OnInit {

  customers: any[] = [];
  dataSource: any[] = []; 
  loading = true;
  error = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'actions'];

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.loading = true;

    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('token')
        : null;

    const headers = { Authorization: `Bearer ${token}` };

    this.http
      .get<any[]>('http://localhost:8000/api/admin/customers', { headers })
      .subscribe({
        next: (data) => {
          // formato que a tabela entende
          this.dataSource = data.map((c: any) => ({
            id: c.id_customer,
            name: c.user?.name ?? 'Sem nome',
            email: c.user?.email ?? 'Sem email',
            status: c.user?.role ?? 'desconhecido',
          }));

          this.loading = false;
        },

        error: () => {
          this.error = 'Erro ao carregar clientes.';
          this.loading = false;
        },
      });
  }
  editar(id: number) {
    this.router.navigate(["admin/customers/edit/"+id]);

  }
}
