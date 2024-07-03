import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-meme',
  standalone: true,
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet]
})
export class MemeComponent {
  tags: string = '';
  selectedFile: File | undefined;

  constructor() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('tags', this.tags);

    // Replace with your backend API endpoint
    fetch('http://localhost:4200/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Upload successful:', data);
      // Clear form fields or handle success message
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      // Handle error message
    });
  }
}
