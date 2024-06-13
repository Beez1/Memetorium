import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';  
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],  
  templateUrl: './meme.component.html',
  styleUrl: './meme.component.css'
})
export class MemeComponent {
  
}
