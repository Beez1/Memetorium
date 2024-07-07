import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Meme {
  _id: string;
  tags: string[];
  image: string; // Base64 image string
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  memes: Meme[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMemes(); // Fetch memes when component initializes
  }

  fetchMemes() {
    this.http.get<any[]>('http://localhost:4201/meme')
      .subscribe({
        next: (memes: any[]) => {
          this.memes = memes.map(meme => ({
            _id: meme._id,
            tags: meme.tags,
            image: meme.image // Assign the Base64 image data
          }));
          console.log('Memes fetched successfully:', this.memes);

          // Call function to display memes dynamically
          this.displayMemes();
        },
        error: (error) => {
          alert('Error fetching memes: ' + error.error.message);
          console.error('Error fetching memes:', error);
        }
      });
  }

  displayMemes() {
    const container = document.getElementById('memeContainer');

    if (container) {
      container.innerHTML = ''; // Clear previous memes

      this.memes.forEach(meme => {
        const memeItem = document.createElement('div');
        memeItem.classList.add('meme-item');

        const tagsList = document.createElement('ul');
        meme.tags.forEach(tag => {
          const tagItem = document.createElement('li');
          tagItem.textContent = tag;
          tagsList.appendChild(tagItem);
        });

        const image = document.createElement('img');
        image.src = meme.image;
        image.alt = 'Meme';

        memeItem.appendChild(tagsList);
        memeItem.appendChild(image);
        container.appendChild(memeItem);
      });
    }
  }
}
