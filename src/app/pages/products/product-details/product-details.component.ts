import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatCard } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
  CommonModule,
  RouterModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule
],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  product: any;
  relatedProducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const id = Number(params.get('id'));

      if (id) {
        this.loadProduct(id);
      }

      // volta para o topo ao trocar produto
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }

  loadProduct(id: number) {

    // produto principal
    this.productService.getPublicProduct(id).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        console.error(err);
      }
    });

    // produtos relacionados
    this.productService.getRelatedProducts(id).subscribe({
      next: (res) => {
        this.relatedProducts = res;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
    addToCart(productId: number) {
    console.log('clicou', productId); // 👈 TESTE

    this.cartService.addToCart(productId).subscribe({
    next: () => {
      alert('Produto adicionado!');
    },
    error: (err) => {
      console.log(err);
      alert('Erro ao adicionar');
    }
  });
}
}