import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

  videos: any[] = [];
  documentaries: any[] = [];
  dramas: any[] = [];
  romances: any[] = [];
  newOnVideoflix: any[] = [];

  constructor(private authService: AuthService, private router: Router, private videoService: VideoService) { }

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos(): void {
    this.videoService.getVideos().subscribe({
      next: (response) => {
        this.videos = response;
        console.log('response:', response);
        this.filterVideos();
      },
      error: (error) => {
        console.error('Error fetching videos', error);
      }
    });
  }

  filterVideos(): void {
    this.documentaries = this.videos.filter(video => video.group === 'documentary');
    this.dramas = this.videos.filter(video => video.group === 'drama');
    this.romances = this.videos.filter(video => video.group === 'romance');
    this.newOnVideoflix = this.videos.filter(video => video.new_on_videoflix);
  }
  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.logoutUser(token).subscribe({
        next: (response) => {
          console.log('Logout successful', response);
          localStorage.removeItem('token');
          this.router.navigate(['/log-in']);
        },
        error: (error) => {
          console.log('Logout failed', error);
        }
      });
    } else {
      console.log('No token found, user not logged in.');
    }
  }

}
