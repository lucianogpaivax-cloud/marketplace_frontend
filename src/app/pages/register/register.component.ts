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
  passwordConfirmation: string = '';
  role: 'cliente' | 'vendedor' = 'cliente';
  tipoLoja = '';
  nacionalidade: 'nacional' | 'internacional' = 'nacional';
  nomeLoja: string = '';
  error = '';
  success = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';
    const payload: any = { name: this.name, email: this.email, password: this.password, password_confirmation: this.passwordConfirmation, role: this.role };
    if (this.role === 'vendedor') {
      payload.tipoLoja = this.tipoLoja;
      payload.nacionalidade = this.nacionalidade;
      payload.nomeLoja = this.nomeLoja;
    }
    this.http.post<any>('http://localhost:8000/api/register', payload)
      .subscribe({
        next: () => {
          this.success = 'Cadastro realizado com sucesso!';
          this.router.navigate(['/login']);
        },
        // chamado sempre que o servidor retornar um código de erro HTTP 
        error: (e) => {
        console.log('Erro completo:', e); // útil para debugar no console

        if (e.status === 422 && e.error) {
          // Pega mensagens específicas de validação (Laravel)
          if (e.error.errors) {
            const mensagens = Object.values(e.error.errors).flat();
            this.error = mensagens.join('\n');
          } else if (e.error.message) {
            this.error = e.error.message;
          } else {
            this.error = 'Erro de validação. Verifique os dados.';
          }
        } else if (e.status === 500) {
          this.error = 'Erro interno no servidor. Tente novamente mais tarde.';
        } else {
          this.error = 'Erro ao cadastrar. Tente novamente.';
        }
      }
    });
  }
}
