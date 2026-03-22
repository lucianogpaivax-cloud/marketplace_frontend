import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-products-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  products: any[] = [];
  loading = true;

  search: string = '';
  category: number | null = null;
  min_price: string = '';
  max_price: string = '';
  sort: string = ''
  categories = [
  { id_category: 1, nome: 'Tênis' },
  { id_category: 2, nome: 'Eletrônicos' },
  { id_category: 3, nome: 'Roupas' },
  { id_category: 4, nome: 'Casa & Decoração' }
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.search = params['search'] || '';
    this.category = params['category'] || '';
    this.min_price = params['min_price'] || '';
    this.max_price = params['max_price'] || '';
    this.sort = params['sort'] || '';

    this.loadProducts();
  });
}

  loadProducts() {
    this.loading = true;

    const params: any = {};

    if (this.search) params.search = this.search;
    if (this.category) params.category = this.category;
    if (this.min_price) params.min_price = this.min_price;
    if (this.max_price) params.max_price = this.max_price;
    if (this.sort) params.sort = this.sort;

    this.productService.getProducts(params).subscribe({
      next: (res) => {
        this.products = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onSearch(event: any) {
    const value = event.target.value;

    this.router.navigate(['/products'], {
      queryParams: { search: value }
      
    });
  }

  applyFilters() {
  this.router.navigate(['/products'], {
    queryParams: {
      search: this.search || null,
      category: this.category || null,
      min_price: this.min_price || null,
      max_price: this.max_price || null,
      sort: this.sort || null
    }
  });
}

  selectCategory(id: number) {
  this.category = this.category === id ? null : id;
}

}