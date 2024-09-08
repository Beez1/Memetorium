import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-meme',
  standalone: true,
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent, NavComponent],
})
export class MemeComponent {

  constructor(private http: HttpClient) {}
  submitForm(ev: Event) {
    ev.preventDefault();

    const formData = new FormData(ev.target as HTMLFormElement)

    this.http.post('https://memetorium.onrender.com/meme', formData)
      .subscribe({
        next: (response: any) => {
          const dialog = document.createElement('dialog');
          dialog.textContent = 'Submission complete';
          dialog.style.cssText = `
            border: 2px solid #ff0077;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            background-color: #2c3e50;
            width: 250px;
            margin: 20% auto;
            color: #ecf0f1;
            text-align: center;
            font-size: 16px;
          `;
          document.body.appendChild(dialog);
          dialog.showModal();
          setTimeout(() => {
            dialog.close();
            document.body.removeChild(dialog);
            (ev.target as HTMLFormElement).reset();
          }, 2000);
        },
        error: (error) => alert(error.error.message),
        complete: () => console.log('Sent values')
      });
  }
}
