import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the Lead interface to strongly type the data
export interface Lead {
  id: string; // Unique identifier for the lead
  name: string; // Name of the lead
  phoneNumber: string; // Phone number of the lead
  email: string; // Email address of the lead
  zipCode: string; // Zip code associated with the lead
  receivedAt: string; // Date and time when the lead was received
  notificationSent: boolean; // Flag to track if notification was sent to the lead
}

// Define the response structure when sending a notification
export interface NotificationResponse {
  lead: Lead; // The lead after notification is sent (with updated status)
  message: string; // The notification message (SMS/Email sent message)
}

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  // API base URL for communicating with the backend
  private apiUrl = 'http://localhost:5156/api/leads';

  // Inject HttpClient for making HTTP requests
  constructor(private http: HttpClient) { }

  /**
   * Fetch all leads from the API
   * @returns Observable of Lead array
   */
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl).pipe(
      catchError((error) => {
        // Log the error and return a user-friendly error message
        console.error('Error fetching leads:', error);
        return throwError(() => new Error('Failed to fetch leads. Please try again later.'));
      })
    );
  }

  /**
   * Fetch a single lead by ID from the API
   * @param id - Lead ID
   * @returns Observable of a single Lead
   */
  getLeadById(id: string): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        // Log the error and provide a meaningful error message
        console.error(`Error fetching lead with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch lead with ID ${id}. Please try again later.`));
      })
    );
  }

  /**
   * Simulate receiving a lead via webhook
   * @param lead - Lead object
   * @returns Observable with API response
   */
  receiveLead(lead: Lead): Observable<{ Message: string; Notification: string }> {
    return this.http.post<{ Message: string; Notification: string }>(this.apiUrl, lead).pipe(
      catchError((error) => {
        // Log the error and provide a user-friendly error message
        console.error('Error receiving lead:', error);
        return throwError(() => new Error('Failed to receive lead. Please try again later.'));
      })
    );
  }

  /**
   * Send a notification for a lead (email/text simulation)
   * @param lead - Lead object
   * @returns Observable with updated Lead object and message
   */
  sendNotification(lead: Lead): Observable<NotificationResponse> {
    return this.http.post<NotificationResponse>(`${this.apiUrl}/send-notification`, lead).pipe(
      catchError((error) => {
        // Log the error and return a user-friendly error message
        console.error(`Error sending notification for lead ${lead.id}:`, error);
        return throwError(() => new Error('Failed to send notification. Please try again later.'));
      })
    );
  }
}
