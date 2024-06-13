import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemeComponent } from './meme/meme.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/meme', pathMatch: 'full' },
  { path: 'meme', component: MemeComponent },
  { path: 'view', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
