import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  // Replace this with the provided image URL
  imageUrl: string = 'https://image-processor-storage.s3.us-west-2.amazonaws.com/images/47f1a10c544f36028fc50e9b1ba77dbb/ras-al-khaimah-championship-day-one.jpg';

  lightboxImageSrc: string = '';
  lightboxVisible: boolean = false;

  showImageInLightbox() {
    this.lightboxImageSrc = this.imageUrl;
    this.lightboxVisible = true;
  }

  closeLightbox() {
    this.lightboxVisible = false;
  }
}
