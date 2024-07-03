import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  // Replace this with the provided image URL
  imageUrl: string = 'https://image-processor-storage.s3.us-west-2.amazonaws.com/images/47f1a10c544f36028fc50e9b1ba77dbb/ras-al-khaimah-championship-day-one.jpg', https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphoto%2Fdublins-grafton-street-gm527902804-92860423&psig=AOvVaw0BY-Y2NCPdOaOJ3BPTjvDA&ust=1720111673038000&source=images&cd=vfe&opi=89978449&ved=0CBQQjhxqFwoTCIC_2rupi4cDFQAAAAAdAAAAABAE;
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
