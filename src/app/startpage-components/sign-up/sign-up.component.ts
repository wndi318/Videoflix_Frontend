import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordFieldType: string = 'password';
  notification: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  passwordMismatch(): boolean {
    return this.password !== this.confirmPassword;
  }

  formValid(): boolean {
    return this.email !== '' && this.password !== '' && !this.passwordMismatch();
  }

  register(): void {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.setMailSend();
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }

  setMailSend(): void {
    this.notification = true;
    setTimeout(() => {
      this.notification = false;
    }, 5000);
  }

  closeBar() {
    this.notification = false;
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
