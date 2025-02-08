import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService, Lead } from '../lead.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {
  lead: Lead | null = null;  // Initialize to null to handle absent lead cases gracefully
  isLoading = true;  // Show loading spinner until data is fetched

  constructor(
    private route: ActivatedRoute,  // To access route parameters
    private leadService: LeadService,  // Service to interact with the backend for lead data
    private location: Location,  // Service to navigate back to the previous page
    private snackBar: MatSnackBar  // Service for showing snackbars
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');  // Retrieve lead ID from the route parameters
    if (id) {
      // Fetch the lead data using the ID from the route
      this.fetchLead(id);
    } else {
      console.warn('No ID found in route parameters.');  // Warn if the ID is missing
      this.isLoading = false;  // Hide the loading spinner as there's no data to load
    }
  }

  // Fetch the lead details based on the provided ID
  private fetchLead(id: string): void {
    this.leadService.getLeadById(id).subscribe(
      (lead) => {
        this.lead = lead;  // Store the fetched lead data in the component property
        this.isLoading = false;  // Hide the loading spinner once data is loaded
      },
      (error) => {
        console.error('Error fetching lead by ID:', error);  // Log any errors that occur while fetching data
        this.isLoading = false;  // Ensure spinner is hidden even in case of error
      }
    );
  }

  // Navigate back to the previous page
  goBack(): void {
    this.location.back();
  }

  // Show a notification message using a snackbar
  private showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,  // Display the snackbar for 4 seconds
      panelClass: ['custom-snackbar'],  // Apply custom CSS class for styling
      verticalPosition: 'top'  // Position the snackbar at the top of the screen
    });
  }

  // Send an SMS/Email notification for the current lead
  sendNotification(lead: Lead | null): void {
    if (!lead) {
      console.warn('Lead is null. Cannot send notification.');  // Log a warning if the lead is not available
      return;  // Exit early if no lead is provided
    }

    // Call the service to send the notification
    this.leadService.sendNotification(lead).subscribe(
      () => {
        lead.notificationSent = true;  // Mark the notification as sent1
        this.showNotification('📩 SMS/Email notification sent successfully!');  // Notify the user of success
      },
      (error) => {
        console.error('Error sending notification:', error);  // Log any errors that occur during notification
        this.showNotification('❌ Failed to send notification.');  // Notify the user of failure
      }
    );
  }
}
