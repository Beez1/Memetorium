import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppRoutingModule } from './app-routing.module'; // Assuming you have AppRoutingModule



@NgModule({
  declarations: [
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule // Include RouterModule here
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
