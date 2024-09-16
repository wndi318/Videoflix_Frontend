import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.url}/register/`, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.url}/login/`, userData);
  }

  logoutUser(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.post(`${this.url}/logout/`, {}, { headers });
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.url}/password-reset/`, { email });
  }

  resetPassword(userId: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.url}/reset-password-confirm/${userId}/${token}/`, {
      new_password: newPassword
    });
  }
}
