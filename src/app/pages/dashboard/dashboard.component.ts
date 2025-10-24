import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule]
})
export class DashboardComponent {
  userRole: 'cliente' | 'vendedor' = 'cliente';

  get menuItems() {
    if (this.userRole === 'cliente') {
      return [
        { label: 'Produtos', link: 'produtos' },
        { label: 'Pedidos', link: 'pedidos' }
      ];
    } else if (this.userRole === 'vendedor') {
      return [
        { label: 'Meus Produtos', link: 'produtos' },
        { label: 'Meus Pedidos', link: 'pedidos' }
      ];
    }
    return [];
  }
}