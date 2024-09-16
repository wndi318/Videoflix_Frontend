import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passwordFieldType: string = 'password';
  password: string = '';
  confirmPassword: string = '';
  userId: string = '';
  token: string = '';
  notification: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.route.snapshot.params['user_id'];
    this.token = this.route.snapshot.params['token'];
  }

  passwordMismatch(): boolean {
    return this.password !== this.confirmPassword;
  }

  formValid(): boolean {
    return this.password !== '' && !this.passwordMismatch();
  }

  resetPassword(): void {
    this.authService.resetPassword(this.userId, this.token, this.password).subscribe({
      next: (response) => {
        console.log('Password reset successful', response);
        this.router.navigate(['/log-in']);
      },
      error: (error) => {
        console.error('Error resetting password', error);
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
