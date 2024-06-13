import { Routes } from '@angular/router';
import { MemeComponent } from './meme/meme.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
  { path: 'meme', component: MemeComponent },
  { path: 'view', component: ViewComponent },
  { path: '', redirectTo: 'meme', pathMatch: 'full' } // Default route redirects to 'meme'
];
