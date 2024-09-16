import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

  constructor(private authService: AuthService, private router: Router) { }
  
  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.logoutUser(token).subscribe({
        next: (response) => {
          console.log('Logout successful', response);
          localStorage.removeItem('token');
          this.router.navigate(['/log-in']);
        },
        error: (error) => {
          console.log('Logout failed', error);
        }
      });
    } else {
      console.log('No token found, user not logged in.');
    }
  }

}
