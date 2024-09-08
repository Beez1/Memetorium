import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

interface Meme {
  _id: string;
  tags: string[];
  image: string; // Base64 image string
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  standalone: true,
  imports: [FooterComponent, NavComponent, RouterModule]
})
export class ViewComponent implements OnInit {
  private readonly apiBaseUrl = 'https://memetorium.onrender.com/meme';
  memes: Meme[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMemes();
  }

  fetchMemes() {
    const apiUrl = this.buildApiUrl(this.searchQuery);
    this.getMemes(apiUrl);
  }

  searchMemesByTag(tag: string) {
    const apiUrl = this.buildApiUrl('', tag);
    this.getMemes(apiUrl);
  }

  private buildApiUrl(search: string = '', tag: string = ''): string {
    let url = this.apiBaseUrl;
    const params: string[] = [];

    if (search.trim() !== '') {
      params.push(`search=${encodeURIComponent(search.trim())}`);
    }

    if (tag !== '') {
      params.push(`tag=${encodeURIComponent(tag)}`);
    }

    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }

    return url;
  }

  private getMemes(apiUrl: string) {
    this.http.get<any[]>(apiUrl).subscribe({
      next: (memes: any[]) => {
        this.memes = this.mapMemes(memes);
        console.log('Memes fetched successfully:', this.memes);
        this.displayMemes();
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  private mapMemes(memes: any[]): Meme[] {
    return memes.map(meme => ({
      _id: meme._id,
      tags: meme.tags,
      image: meme.image
    }));
  }

  private handleError(error: any) {
    alert('Error fetching memes: ' + error.error.message);
    console.error('Error fetching memes:', error);
  }

  displayMemes() {
    const container = document.getElementById('memeContainer');
    if (!container) return;

    container.innerHTML = '';
    this.memes.forEach(meme => {
      const memeItem = this.createMemeItem(meme);
      container.appendChild(memeItem);
    });
  }

  private createMemeItem(meme: Meme): HTMLElement {
    const memeItem = document.createElement('div');
    memeItem.classList.add('meme-item');

    const tagsList = this.createTagsList(meme.tags);
    const image = this.createMemeImage(meme.image);
    const downloadButton = this.createDownloadButton(meme.image);

    memeItem.appendChild(tagsList);
    memeItem.appendChild(image);
    memeItem.appendChild(downloadButton);

    return memeItem;
  }
  private createTagsList(tags: string[]): HTMLElement {
    const tagsList = document.createElement('div');
    tagsList.classList.add('tags-list');
    tags.forEach(tag => {
      const tagItem = document.createElement('span');
      tagItem.textContent = tag;
      tagItem.classList.add('tag-item');
      tagItem.style.fontWeight = 'bold';
      tagItem.style.fontFamily = 'Arial, sans-serif';
      tagItem.style.fontSize = '19px';
      tagsList.appendChild(tagItem);
    });
    return tagsList;
  }

  private createMemeImage(imageUrl: string): HTMLImageElement {
    const image = document.createElement('img');
    image.src = imageUrl;
    image.alt = 'Meme';
    return image;
  }
  private createDownloadButton(imageUrl: string): HTMLElement {
    const downloadButton = document.createElement('button');
    downloadButton.classList.add('download-button');
    downloadButton.textContent = 'Download';
    downloadButton.style.backgroundColor = '#2c3e50';
    downloadButton.style.border = 'none';
    downloadButton.style.color = 'white';
    downloadButton.style.padding = '10px 20px';
    downloadButton.style.textAlign = 'center';
    downloadButton.style.textDecoration = 'none';
    downloadButton.style.display = 'inline-block';
    downloadButton.style.fontSize = '16px';
    downloadButton.style.margin = '4px 2px';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.borderRadius = '4px';
    downloadButton.addEventListener('click', () => this.downloadImage(imageUrl));
    return downloadButton;
  }

  private downloadImage(imageUrl: string) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}