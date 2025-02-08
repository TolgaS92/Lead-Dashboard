import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LeadListComponent } from './lead-list/lead-list.component'; // Import LeadListComponent for displaying lead list
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule for routing setup
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import Angular animations support
import { MatCardModule } from '@angular/material/card'; // Material Design Card component module
import { MatButtonModule } from '@angular/material/button'; // Material Design Button component module
import { MatToolbarModule } from '@angular/material/toolbar'; // Material Design Toolbar component module
import { HttpClientModule } from '@angular/common/http'; // For making HTTP requests
import { LeadDetailComponent } from './lead-detail/lead-detail.component'; // Import LeadDetailComponent to show lead details
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Material Design SnackBar for notifications
import { MatTableModule } from '@angular/material/table'; // Material Design Table for displaying lead data
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Material Progress Spinner for loading indicators

@NgModule({
  declarations: [
    AppComponent, // Declare the main AppComponent
    LeadListComponent, // Declare the LeadListComponent for listing leads
    LeadDetailComponent, // Declare the LeadDetailComponent for detailed view of individual leads
  ],
  imports: [
    BrowserModule, // Core module for running Angular apps in the browser
    AppRoutingModule, // Import routing module to handle application navigation
    BrowserAnimationsModule, // Required for Angular animations
    MatCardModule, // Import Material Design Card module for styling
    MatButtonModule, // Import Material Design Button module for styling
    MatToolbarModule, // Import Material Design Toolbar module for header design
    HttpClientModule, // Import HTTP Client module to make HTTP calls to the backend
    MatSnackBarModule, // Import SnackBar for showing notifications
    MatTableModule, // Import Material Design Table module for listing data
    MatProgressSpinnerModule, // Import Material Design Progress Spinner module for loading indication
  ],
  providers: [
    // Add services here if needed in the future (like HTTP Interceptors, custom services)
  ],
  bootstrap: [AppComponent] // Set the root component to bootstrap the Angular application
})
export class AppModule {
  constructor() {
    // Log to confirm AppModule initialization
    console.log('AppModule loaded successfully');
  }
}
