import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {

email: string = '';

constructor (private router: Router) { }

goToSignUp() {
  this.router.navigate(['/sign-up'], { queryParams: { email: this.email } });
}

}
