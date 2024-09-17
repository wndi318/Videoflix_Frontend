import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    return this.http.get(this.url);
  }

  getVideoById(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}/`);
  }
}
