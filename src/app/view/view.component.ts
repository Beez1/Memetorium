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
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMemes(); // Fetch memes when component initializes
  }

  fetchMemes() {
    let apiUrl = 'http://localhost:4202/meme';

    if (this.searchQuery.trim() !== '') {
      apiUrl += `?search=${this.searchQuery.trim()}`;
    }

    this.http.get<any[]>(apiUrl)
      .subscribe({
        next: (memes: any[]) => {
          this.memes = memes.map(meme => ({
            _id: meme._id,
            tags: meme.tags,
            image: meme.image
          }));
          console.log('Memes fetched successfully:', this.memes);

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
      container.innerHTML = '';

      this.memes.forEach(meme => {
        const memeItem = document.createElement('div');
        memeItem.classList.add('meme-item');

        const tagsList = document.createElement('div');
        meme.tags.forEach(tag => {
          const tagItem = document.createElement('span');
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
