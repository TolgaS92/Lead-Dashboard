import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the Lead interface to strongly type the data
export interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  zipCode: string;
  receivedAt: string;
  notificationSent: boolean;
}

// Define the response structure when sending a notification
export interface NotificationResponse {
  lead: Lead;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  // API base URL for communicating with the backend
  private apiUrl = 'https://TolgaS92.github.io/Lead-Dashboard/api/leads';

  // Sample mock data to be used on GitHub Pages
  private mockLeads: Lead[] = [
    {
      id: '1',
      name: 'John Doe',
      phoneNumber: '123-456-7890',
      email: 'john@example.com',
      zipCode: '12345',
      receivedAt: new Date().toISOString(),
      notificationSent: false,
    },
    {
      id: '2',
      name: 'Jane Smith',
      phoneNumber: '987-654-3210',
      email: 'jane@example.com',
      zipCode: '67890',
      receivedAt: new Date().toISOString(),
      notificationSent: true,
    },
  ];

  constructor(private http: HttpClient) { }

  getLeads(): Observable<Lead[]> {
    // Use mock data for GitHub Pages or real API in development
    if (this.isProduction()) {
      return of(this.mockLeads);  // Return mock leads if in production
    } else {
      return this.http.get<Lead[]>(this.apiUrl).pipe(
        catchError((error) => {
          console.error('Error fetching leads:', error);
          return throwError(() => new Error('Failed to fetch leads. Please try again later.'));
        })
      );
    }
  }

  getLeadById(id: string): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching lead with ID ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch lead with ID ${id}. Please try again later.`));
      })
    );
  }

  receiveLead(lead: Lead): Observable<{ Message: string; Notification: string }> {
    return this.http.post<{ Message: string; Notification: string }>(this.apiUrl, lead).pipe(
      catchError((error) => {
        console.error('Error receiving lead:', error);
        return throwError(() => new Error('Failed to receive lead. Please try again later.'));
      })
    );
  }

  sendNotification(lead: Lead): Observable<NotificationResponse> {
    return this.http.post<NotificationResponse>(`${this.apiUrl}/send-notification`, lead).pipe(
      catchError((error) => {
        console.error(`Error sending notification for lead ${lead.id}:`, error);
        return throwError(() => new Error('Failed to send notification. Please try again later.'));
      })
    );
  }

  // Helper method to check if running in production
  private isProduction(): boolean {
    return window.location.hostname.includes('github.io');
  }
}
