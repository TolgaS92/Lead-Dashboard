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
export class LeadDetailComponent {
  lead: Lead | null = null; // Explicitly allow null values
  isLoading = true; // Ensure loading state is properly used

  constructor(
    private route: ActivatedRoute,
    private leadService: LeadService,
    private location: Location,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.leadService.getLeadById(id).subscribe(
        (lead) => {
          this.lead = lead;
          console.log('Fetched lead:', lead);
          this.isLoading = false;  // Stop spinner immediately after data is fetched
        },
        (error) => {
          console.error('Error fetching lead by ID:', error);
          this.isLoading = false;
        }
      );
    }
  }

  goBack(): void {
    this.location.back();
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['custom-snackbar'],
      verticalPosition: 'top',
    });
  }

  sendNotification(lead: Lead | null): void {
    if (!lead) {
      console.warn("No lead available to send notification.");
      return;
    }

    this.leadService.sendNotification(lead).subscribe(
      () => {
        console.log("Notification sent successfully!");
        lead.notificationSent = true;
        this.showNotification("📩 SMS/Email notification sent successfully!");
      },
      (error) => {
        console.error('Error sending notification:', error);
        this.showNotification("❌ Failed to send notification.");
      }
    );
  }
}
