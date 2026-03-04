import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-seller-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.css'
})
export class SellerProductsComponent implements OnInit {

  expandedElement: any | null = null;

  toggleDetails(product: any) {
  this.expandedElement =
  this.expandedElement === product ? null : product;
  }

  displayedColumns: string[] = [
    'nome',
    'categoria',
    'preco',
    'status',
    'acoes'
  ];

  products: any[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    this.productService.myProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        alert('Erro ao carregar produtos');
        this.loading = false;
      }
    });
  }

  createProduct() {
    this.router.navigate(['/seller/products/create']);
  }

  editProduct(product: any) {
    this.router.navigate(['/seller/products/edit', product.id_product]);
  }

  deleteProduct(product: any) {
    if (!confirm(`Deseja excluir o produto "${product.nome}"?`)) {
      return;
    }

    this.productService.deleteProduct(product.id_product)
    .subscribe({
      next: () => {

        // Remove da lista imediatamente
        this.products = this.products.filter(
          p => p.id_product !== product.id_product
        );

        alert('Produto excluído com sucesso!');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao excluir produto.');
      }
    });
  }
}
