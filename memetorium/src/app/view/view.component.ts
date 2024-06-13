import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  memes = ['meme1.jpg', 'meme2.png', 'meme3.gif']; // Example memes

  constructor() { }
}