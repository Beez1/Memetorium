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
  
  }
