import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log("🔎 Enviando requisição POST para /api/login...");

    this.http.post<any>(
      'http://localhost:8000/api/login',
      {
        email: this.email,
        password: this.password
      },
      { headers: headers }
    ).subscribe({
      next: (res) => {
        console.log("✔ Login bem-sucedido:", res);

        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const role = res.user.role;

        if (role === 'admin') {
          this.router.navigate(['/dashboard-admin']);
        } else if (role === 'vendedor') {
          this.router.navigate(['/dashboard-seller']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (e) => {
        console.error("❌ Erro no login:", e);

        if (e.status === 405) {
          this.error = 'Erro 405: O backend está recebendo GET ao invés de POST.';
        } else if (e.status === 401) {
          this.error = 'Email ou senha inválidos.';
        } else {
          this.error = 'Erro inesperado. Verifique o backend.';
        }
      }
    });
  }
}
