import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';  // Import environment
import { mockLeads } from '../mock-leads';  // Import mock data

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
  private apiUrl = 'http://localhost:5156/api/leads';

  constructor(private http: HttpClient) { }

  getLeads(): Observable<Lead[]> {
    if (environment.production) {
      // If running in production, return mock data
      return of(mockLeads);
    } else {
      // Otherwise, call the real API
      return this.http.get<Lead[]>(this.apiUrl).pipe(
        catchError((error) => {
          console.error('Error fetching leads:', error);
          return throwError(() => new Error('Failed to fetch leads.'));
        })
      );
    }
  }

  getLeadById(id: string): Observable<Lead> {
    if (environment.production) {
      // Return mock data for specific ID in production
      const lead = mockLeads.find((lead) => lead.id === id);
      return of(lead as Lead);
    } else {
      // Call the real API in development
      return this.http.get<Lead>(`${this.apiUrl}/${id}`).pipe(
        catchError((error) => {
          console.error(`Error fetching lead with ID ${id}:`, error);
          return throwError(() => new Error('Failed to fetch lead.'));
        })
      );
    }
  }

  receiveLead(lead: Lead): Observable<{ Message: string; Notification: string }> {
    return this.http.post<{ Message: string; Notification: string }>(this.apiUrl, lead).pipe(
      catchError((error) => {
        console.error('Error receiving lead:', error);
        return throwError(() => new Error('Failed to receive lead.'));
      })
    );
  }

  sendNotification(lead: Lead): Observable<NotificationResponse> {
    return this.http.post<NotificationResponse>(`${this.apiUrl}/send-notification`, lead).pipe(
      catchError((error) => {
        console.error(`Error sending notification for lead ${lead.id}:`, error);
        return throwError(() => new Error('Failed to send notification.'));
      })
    );
  }
}
