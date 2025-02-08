import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from '../lead.service';
import { Lead } from '../lead.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent {
  leads: Lead[] = [];  // Array to hold the list of leads
  isLoading: boolean = false;  // Boolean to control loading spinner visibility
  displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'actions'];  // Columns for displaying in the table

  constructor(
    private leadService: LeadService,  // Inject LeadService for data handling
    private router: Router,           // Inject Router for navigation
    private snackBar: MatSnackBar     // Inject MatSnackBar to show notifications
  ) { }

  /**
   * ngOnInit lifecycle hook - loads leads when the component is initialized.
   * Simulates a delay to demonstrate loading state and to simulate slow API responses.
   */
  ngOnInit(): void {
    this.isLoading = true;  // Show spinner when loading leads
    // Simulate a delay to mimic a slow API response for testing purposes
    setTimeout(() => {
      this.leadService.getLeads().subscribe(
        (data) => {
          this.leads = data;  // Store the fetched leads
          this.isLoading = false;  // Hide the loading spinner after data is fetched
        },
        (error) => {
          console.error('Error fetching leads:', error);  // Log the error to the console
          this.isLoading = false;  // Hide the loading spinner if there's an error
          this.showNotification("❌ Failed to load leads.");  // Show error notification
        }
      );
    }, 2000);  // Set a 2-second delay for simulation
  }

  /**
   * Handles row click event to navigate to the lead detail page.
   * @param lead - The clicked lead object
   */
  onRowClick(lead: Lead): void {
    this.router.navigate(['/lead', lead.id]);  // Navigate to the lead detail page
  }

  /**
   * Sends an SMS/Email notification for the selected lead.
   * @param lead - The lead object for which notification needs to be sent
   */
  sendNotification(lead: Lead): void {
    if (!lead) return;  // Check if the lead is valid before proceeding

    this.leadService.sendNotification(lead).subscribe(
      (response) => {
        // If no lead is returned, update manually
        lead.notificationSent = true;  // Mark the lead as having been notified
        this.showNotification("📩 SMS/Email notification sent successfully!");  // Show success notification
      },
      (error) => {
        console.error('Error sending notification:', error);  // Log the error to the console
        this.showNotification("❌ Failed to send notification.");  // Show error notification
      }
    );
  }

  /**
   * Displays a notification message using MatSnackBar.
   * @param message - The message to display in the notification
   */
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,  // Display the notification for 4 seconds
      panelClass: ['custom-snackbar'],  // Custom styling for the snackbar
      verticalPosition: 'top',  // Display at the top of the screen
    });
  }
}
