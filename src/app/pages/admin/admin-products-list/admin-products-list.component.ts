import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-products-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {

  displayedColumns: string[] = [
    'id_product',
    'nome',
    'preco',
    'status',
    'seller',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);
  loading = false;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getAdminProducts().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar produtos';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}