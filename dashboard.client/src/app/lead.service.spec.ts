import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // For HTTP mock testing
import { LeadService } from './lead.service'; // Import your service
import { Lead, NotificationResponse } from './lead.service'; // Import Lead and NotificationResponse

describe('LeadService', () => {
  let service: LeadService;
  let httpMock: HttpTestingController; // For mocking HTTP requests

  // Set up TestBed to configure the testing module and inject the service
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock the HTTP module
      providers: [LeadService], // Provide the LeadService
    });

    service = TestBed.inject(LeadService); // Inject the service to test
    httpMock = TestBed.inject(HttpTestingController); // Inject HttpTestingController to mock API calls
  });

  // Cleanup after each test
  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests are left unverified
  });

  // Test for ensuring the service is created
  it('should be created', () => {
    expect(service).toBeTruthy(); // The service should be instantiated correctly
  });

  // Test for sending a notification (this simulates the HTTP POST request)
  it('should send a notification for a lead', () => {
    // Creating a mock lead object to test the functionality
    const leadToNotify: Lead = {
      id: '1', // Unique identifier
      name: 'John Doe', // Lead's name
      phoneNumber: '123-456-7890', // Lead's phone number
      email: 'john.doe@example.com', // Lead's email (if available)
      zipCode: '12345', // Lead's zip code
      receivedAt: '2025-02-01T00:00:00Z', // When the lead was received
      notificationSent: false, // Initial notificationSent flag set to false
    };

    // Mock the expected response after sending the notification
    const mockNotificationResponse: NotificationResponse = {
      lead: { ...leadToNotify, notificationSent: true }, // Updated lead with notificationSent set to true
      message: 'SMS notification sent successfully to John Doe.', // Simulated response message
    };

    // Call the service's sendNotification method
    service.sendNotification(leadToNotify).subscribe((response) => {
      // Check that the response contains the correct message
      expect(response.message).toBe('SMS notification sent successfully to John Doe.');

      // Ensure that the lead's notificationSent flag is updated to true
      expect(response.lead.notificationSent).toBe(true);
    });

    // Expect a POST request to the API for sending the notification
    const req = httpMock.expectOne('http://localhost:5156/api/leads/send-notification');
    expect(req.request.method).toBe('POST'); // Ensure the HTTP method is POST
    req.flush(mockNotificationResponse); // Simulate the API response with the mock data
  });
});
