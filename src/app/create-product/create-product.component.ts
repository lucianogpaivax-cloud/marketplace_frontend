import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  product = {
    id_category: '',
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

        if (err.status === 403) {
          alert('Você não tem permissão para criar produtos.');
        } else {
          alert('Erro ao criar produto.');
        }
      }
    });
  }
}
