import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}


  login() {
    const userData = { email: this.email, password: this.password };
  
    this.authService.loginUser(userData).subscribe({
      next: (response: any) => { 
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/main-content']);
      },
      error: (error: any) => {
        console.log('Login failed', error);
      }
    });
  }

  togglePasswordVisibility(event: MouseEvent): void {
    const inputField = event.target as HTMLInputElement;

    const inputWidth = inputField.offsetWidth;
    const clickPosition = event.clientX - inputField.getBoundingClientRect().left;
    const iconPositionStart = inputWidth - 40;

    if (clickPosition >= iconPositionStart) {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }

  changeCursorOnHover(event: MouseEvent): void {
    const inputField = event.target as HTMLInputElement;
    const inputWidth = inputField.offsetWidth;
    const hoverPosition = event.clientX - inputField.getBoundingClientRect().left;
    const iconPositionStart = inputWidth - 40;
    if (hoverPosition >= iconPositionStart) {
      inputField.style.cursor = 'pointer';
    } else {
      inputField.style.cursor = 'text';
    }
  }
}

