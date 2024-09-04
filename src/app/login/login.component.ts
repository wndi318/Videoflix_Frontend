import { Component } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NavbarComponent,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordFieldType: string = 'password';

  togglePasswordVisibility(event: MouseEvent): void {
    const inputField = event.target as HTMLInputElement;

    // Berechne, ob der Klick im Bereich des Sichtbarkeits-Symbols war
    const inputWidth = inputField.offsetWidth;
    const clickPosition = event.clientX - inputField.getBoundingClientRect().left;
    const iconPositionStart = inputWidth - 40; // Position des Icons basierend auf background-position und padding

    if (clickPosition >= iconPositionStart) {
      // Wenn in den Bereich des Icons geklickt wurde, Passwort anzeigen/ausblenden
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
}
