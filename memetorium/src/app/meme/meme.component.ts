import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-meme',
  standalone: true,
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class MemeComponent {

  constructor(private http: HttpClient) {}

  submitForm(ev: Event) {
    ev.preventDefault();

    const formData = new FormData(ev.target as HTMLFormElement)

    this.http.post('http://localhost:4202/meme', formData)
      .subscribe({
        next: (response: any) => alert(response.message),
        error: (error) => alert(error.error.message),
        complete: () => console.log('Sent values')
      });
  }
}
