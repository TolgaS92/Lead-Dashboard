import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Define the Lead interface to better type the data
export interface Lead {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  zipCode: string;
  receivedAt: string;
  notificationSent: boolean;  // New property to track notification status
}

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  private apiUrl = 'http://localhost:5156/api/leads'; // API endpoint to fetch leads

  constructor(private http: HttpClient) { }

  // Fetch all leads from the API
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.apiUrl);  // Make the API request and return an observable
  }

  // Fetch a single lead by ID from the API
  getLeadById(id: string): Observable<Lead> {
    return this.http.get<Lead>(`${this.apiUrl}/${id}`);  // Make the API request for the lead by ID
  }

  receiveLead(lead: Lead): Observable<{ Message: string; Notification: string }> {
    return this.http.post<{ Message: string; Notification: string }>(this.apiUrl, lead);
  }

  sendNotification(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(`${this.apiUrl}/send-notification`, lead);
  }
}
