import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Define the custom selector for the component (used in HTML templates)
  templateUrl: './app.component.html', // Link to the HTML template for this component
  styleUrls: ['./app.component.css'] // Link to the CSS styles for this component (ensure this file exists)
})
export class AppComponent {
  title = 'Lead Management Dashboard'; // Define the title for the dashboard, which can be used in the template

  constructor() {
    // Log to confirm that the component has been initialized
    console.log('AppComponent initialized');
  }
}
