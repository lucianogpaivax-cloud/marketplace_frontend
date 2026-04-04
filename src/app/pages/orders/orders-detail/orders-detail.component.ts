import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ]
})
export class OrderDetailComponent implements OnInit {

  order: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder(id);
  }

  loadOrder(id: number) {
    this.loading = true;

    this.orderService.getOrderById(id).subscribe({
      next: (res: any) => {
        this.order = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/orders']);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return 'warn';
      case 'paid': return 'primary';
      case 'shipped': return 'accent';
      case 'delivered': return 'primary';
      case 'cancelled': return '';
      default: return '';
    }
  }

  getTotalItems(): number {
    if (!this.order?.items) return 0;
    return this.order.items.reduce((acc: number, item: any) => acc + item.quantidade, 0);
  }
}