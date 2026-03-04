import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  product: any = {
    nome: '',
    descricao: '',
    preco: '',
    status: '',
    id_category: ''
  };

  productId!: number;
  loading = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
  }

  loadProduct() {
    this.loading = true;

    this.productService.getProductById(this.productId)
      .subscribe({
        next: (res) => {
          this.product = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao carregar produto.');
          this.router.navigate(['/seller/products']);
        }
      });
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.product)
      .subscribe({
        next: (res) => {
          alert('Produto atualizado com sucesso!');
          this.router.navigate(['/seller/products']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao atualizar produto.');
        }
      });
  }

  cancel() {
    this.router.navigate(['/seller/products']);
  }

}
