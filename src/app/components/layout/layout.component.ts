import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  
  router = inject(Router);

  onlogout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }
}
