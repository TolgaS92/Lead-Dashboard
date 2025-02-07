import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LeadListComponent } from './lead-list/lead-list.component'; // Import LeadListComponent
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import the routing module
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule
import { HttpClientModule } from '@angular/common/http';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LeadListComponent,
    LeadDetailComponent, // Declare LeadListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Add AppRoutingModule here
    MatCardModule,
    MatButtonModule, // Add MatButtonModule here
    MatToolbarModule, // Add MatToolbarModule here
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
