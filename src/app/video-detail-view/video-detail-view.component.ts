import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideoService } from '../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './video-detail-view.component.html',
  styleUrl: './video-detail-view.component.scss'
})
export class VideoDetailViewComponent {
  videoDetails: any;
  selectedQuality: string = '720p';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private videoService: VideoService,
    public dialogRef: MatDialogRef<VideoDetailViewComponent>
  ) {}

  ngOnInit(): void {
    this.fetchVideoDetails();
  }

  fetchVideoDetails(): void {
    const videoId = this.data.id;
    this.videoService.getVideoById(videoId).subscribe({
      next: (response) => {
        this.videoDetails = response;
        this.updateVideoSource();
      },
      error: (error) => {
        console.error('Error fetching video details', error);
      }
    });
  }

  onQualityChange(): void {
    this.updateVideoSource();
  }

  updateVideoSource(): void {
    const videoElement = document.querySelector('video');
    if (!videoElement || !this.videoDetails) {
      return;
    }

    switch (this.selectedQuality) {
      case '480p':
        videoElement.src = this.videoDetails.video_480p_url;
        break;
      case '720p':
        videoElement.src = this.videoDetails.video_720p_url;
        break;
      case '1080p':
        videoElement.src = this.videoDetails.video_1080p_url;
        break;
      default:
        videoElement.src = this.videoDetails.video_file;
        break;
    }
  }

  playVideoInFullscreen(videoElement: HTMLVideoElement): void {
    const requestFullscreen = videoElement.requestFullscreen ||
      (videoElement as any).mozRequestFullScreen ||
      (videoElement as any).webkitRequestFullscreen || 
      (videoElement as any).msRequestFullscreen;

    if (requestFullscreen) {
      requestFullscreen.call(videoElement);
    }

    videoElement.style.display = 'block';
    videoElement.play();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
