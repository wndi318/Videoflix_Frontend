import { Routes } from '@angular/router';
import { StartPageComponent } from './startpage-components/start-page/start-page.component';
import { LoginComponent } from './startpage-components/login/login.component';
import { ForgotPasswordComponent } from './startpage-components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './startpage-components/reset-password/reset-password.component';
import { SignUpComponent } from './startpage-components/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'log-in', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'sign-up', component: SignUpComponent},
];
