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
  leads: Lead[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'phoneNumber', 'email', 'actions'];  // Array of column names

  constructor(
    private leadService: LeadService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;  // Show spinner when loading
    // Simulate a delay for testing
    setTimeout(() => {
      this.leadService.getLeads().subscribe(
        (data) => {
          console.log('Fetched leads:', data);
          this.leads = data;
          this.isLoading = false;  // Hide spinner after data is fetched
        },
        (error) => {
          console.error('Error fetching leads:', error);
          this.isLoading = false;  // Hide spinner on error
        }
      );
    }, 2000);  // Delay of 2 seconds to simulate a slow API response
  }

  onRowClick(lead: Lead): void {
    this.router.navigate(['/lead', lead.id]);
    console.log('Navigating to lead detail with id:', lead.id);  // Log the ID being passed
  }

  sendNotification(lead: Lead): void {
    if (!lead) return; // Ensure lead is valid

    this.leadService.sendNotification(lead).subscribe(
      (response) => {
        console.log("Notification sent successfully!");

        // If no lead is returned, update manually
        lead.notificationSent = true;

        this.showNotification("📩 SMS/Email notification sent successfully!");
      },
      (error) => {
        console.error('Error sending notification:', error);
        this.showNotification("❌ Failed to send notification.");
      }
    );
  }

  // ✅ **Add this method to show notifications**
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
    });
  }
}
