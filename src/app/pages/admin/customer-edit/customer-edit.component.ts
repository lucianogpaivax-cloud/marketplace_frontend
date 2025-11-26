import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './customer-edit.component.html',
})
export class CustomerEditComponent implements OnInit {

  customer: any = {
    id: '',
    name: '',
    email: '',
    status: ''
  };

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCustomer();
  }

  
  loadCustomer() {
    const token =
  typeof window !== 'undefined'
    ? localStorage.getItem('token')
    : null;

    const headers = { Authorization: `Bearer ${token}` };
    console.log(`http://localhost:8000/api/admin/customers/${this.id}`);
    
    this.http.get<any>(`http://localhost:8000/api/admin/customers/${this.id}`, { headers })
      .subscribe((data) => {
        this.customer = {
          name: data.user?.name,
          email: data.user?.email,
          status: data.user?.role
        };
      });
  }

  save() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.put(
      `http://localhost:8000/api/admin/customers/${this.id}`,
      this.customer,
      { headers }
    )
    .subscribe({
      next: () => {
        alert("Cliente atualizado!");

        // Redirecionar para lista de clientes
        this.router.navigate(['/admin/customers']);
      },
      error: (err) => {
        console.error(err);
        alert("Erro ao atualizar o cliente!");
      }
    });
  }
}