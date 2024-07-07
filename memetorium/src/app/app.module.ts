import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule if needed
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component'; // Adjust path as per your project structure

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, // Ensure CommonModule is imported
    HttpClientModule // Import HttpClientModule if you are using HttpClient
    // Other modules as needed
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
