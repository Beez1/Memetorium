import { Component } from '@angular/core';

@Component({
  selector: 'app-meme',
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css']
})
export class MemeComponent {
  memes: { name: string, url: string }[] = [];

  onMemeUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.memes.push({ name: file.name, url: URL.createObjectURL(file) });
    }
  }
}
