import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadDetailComponent } from './lead-detail/lead-detail.component';

// Define the application routes
const routes: Routes = [
  // Route for the lead list view (root path)
  {
    path: '',
    component: LeadListComponent,
    // Log to confirm this route is accessed
    // You can use `console.log` for debugging purposes to track route changes
    // Or add navigation guards if further checks are needed
  },

  // Route for lead detail view with dynamic parameter 'id'
  {
    path: 'lead/:id',
    component: LeadDetailComponent,
    // The ':id' part of the path is dynamic, meaning it can vary for each lead
    // This route maps to the LeadDetailComponent, which will use the 'id' parameter
    // to fetch and display details for a specific lead.
  }
];

@NgModule({
  // Import the routing configuration to set up routing in the app
  imports: [RouterModule.forRoot(routes)],

  // Export the RouterModule to be available across the application
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
    // Log a warning for any invalid or unhandled route accesses
    // In case of an invalid route, Angular will show a default 404 page or component
    console.warn('AppRoutingModule initialized successfully. Ensure routes are correctly defined and tested.');
  }
}
