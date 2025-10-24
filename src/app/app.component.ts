import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ para ngIf, ngFor, pipes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    CommonModule,            // ✅ para diretivas comuns
    FormsModule,
    MaterialModule,
    RouterModule             // ✅ para router-outlet e routerLink
  ]
})
export class AppComponent {
  title = 'Marketplace';
}