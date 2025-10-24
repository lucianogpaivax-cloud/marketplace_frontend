import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role: 'cliente' | 'vendedor' = 'cliente';
  tipoLoja = '';
  nacionalidade: 'nacional' | 'internacional' = 'nacional';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';
    const payload: any = { name: this.name, email: this.email, password: this.password, role: this.role };
    if (this.role === 'vendedor') {
      payload.tipoLoja = this.tipoLoja;
      payload.nacionalidade = this.nacionalidade;
    }
    this.http.post<any>('http://localhost:8000/api/register', payload)
      .subscribe({
        next: () => {
          this.success = 'Cadastro realizado com sucesso!';
          this.router.navigate(['/login']);
        },
        error: () => this.error = 'Erro ao cadastrar. Verifique os dados.'
      });
  }
}
