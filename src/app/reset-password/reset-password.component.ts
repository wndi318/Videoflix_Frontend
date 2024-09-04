import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passwordFieldType: string = 'password';

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
