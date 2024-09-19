import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailViewComponent } from './video-detail-view.component';

describe('VideoDetailViewComponent', () => {
  let component: VideoDetailViewComponent;
  let fixture: ComponentFixture<VideoDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoDetailViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
