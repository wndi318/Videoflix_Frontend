import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string = '';
  notification: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { }

  requestPasswordReset(): void {
    if (this.formValid()) {
      this.authService.requestPasswordReset(this.email).subscribe({
        next: (response) => {
          this.notification = true;
          this.errorMessage = null;

          setTimeout(() => {
            this.notification = false;
          }, 5000);
        },
        error: (error) => {
          if (error.error && error.error.email) {
            this.errorMessage = error.error.email[0];
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }

          setTimeout(() => {
            this.notification = false;
          }, 5000);
        }
      });
    }
  }

  formValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  closeBar() {
    this.notification = false;
    this.errorMessage = null;
  }
}
