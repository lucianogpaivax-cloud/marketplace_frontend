import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Angular Material (MODULES!)
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  product = {
    id_category: null as number | null,
  nome: '',
  descricao: '',
  preco: null as number | null,
  imagem: '',
  status: 'ativo'
  };

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  submit() {
    this.productService.createProduct(this.product).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.router.navigate(['/seller/products']);
      },
      error: (err) => {
        console.error(err);
        alert(err.status === 403
          ? 'Você não tem permissão para criar produtos.'
          : 'Erro ao criar produto.'
        );
      }
    });
  }

  cancel() {
    this.router.navigate(['/seller/products']);
  }
}

