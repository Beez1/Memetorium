import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module'; // Assuming you have AppRoutingModule

import { AppComponent } from './app.component';
import { MemeComponent } from './meme/meme.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule // Include RouterModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
