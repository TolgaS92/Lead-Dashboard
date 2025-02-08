import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadDetailComponent } from './lead-detail.component';
import { LeadService } from '../lead.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';

// Create a spy object for the LeadService to mock its methods
const mockLeadService = jasmine.createSpyObj('LeadService', ['getLeadById', 'sendNotification']);

// Mock classes for dependencies that are not directly tested
class MockSnackBar {
  open() { }
}

class MockActivatedRoute {
  snapshot = { paramMap: { get: () => '1' } }; // Simulates route parameter 'id'
}

class MockLocation {
  back() { }
}

describe('LeadDetailComponent', () => {
  let component: LeadDetailComponent;
  let fixture: ComponentFixture<LeadDetailComponent>;
  let leadService: LeadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadDetailComponent],
      providers: [
        { provide: LeadService, useValue: mockLeadService },  // Use the mocked LeadService
        { provide: MatSnackBar, useClass: MockSnackBar },      // Use the mocked MatSnackBar
        { provide: ActivatedRoute, useClass: MockActivatedRoute }, // Use the mocked route
        { provide: Location, useClass: MockLocation }, // Use the mocked location service
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LeadDetailComponent);
    component = fixture.componentInstance;
    leadService = TestBed.inject(LeadService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load lead details on initialization', () => {
    // Mock lead data with all required fields
    const mockLead = {
      id: '1',
      name: 'John Doe',
      phoneNumber: '555-1234',  // Required field
      email: 'john@example.com',
      zipCode: '12345',  // Required field
      receivedAt: new Date().toISOString(),  // Required field
      notificationSent: false,  // Initially false
    };

    // Set up the spy to return mock lead data
    mockLeadService.getLeadById.and.returnValue(of(mockLead));

    component.ngOnInit(); // Call the initialization method

    // Verify that getLeadById was called with the correct ID
    expect(mockLeadService.getLeadById).toHaveBeenCalledWith('1');
    expect(component.isLoading).toBe(false);  // Ensure loading flag is set to false
    expect(component.lead).toEqual(mockLead); // Check if the component received the expected lead data
  });

  it('should handle error while loading lead details', () => {
    // Simulate an error response from getLeadById
    mockLeadService.getLeadById.and.returnValue(throwError('Error fetching lead'));

    component.ngOnInit(); // Call the initialization method

    expect(component.isLoading).toBe(false);  // Ensure loading stops even on error
    expect(component.lead).toBeNull();  // The lead should not be set
  });

  it('should call goBack() and navigate back', () => {
    const locationSpy = spyOn(component['location'], 'back');
    component.goBack();
    expect(locationSpy).toHaveBeenCalled();  // Ensure that the back method was called
  });

  it('should send notification successfully', () => {
    // Mock lead data including all required properties
    const lead = {
      id: '1',
      name: 'John Doe',
      phoneNumber: '555-1234',
      email: 'john@example.com',
      zipCode: '12345',
      receivedAt: new Date().toISOString(),
      notificationSent: false,
    };

    // Simulate successful notification sending
    mockLeadService.sendNotification.and.returnValue(of({
      lead: { ...lead, notificationSent: true }, // Update notificationSent flag
      message: 'Notification sent successfully',
    }));

    component.sendNotification(lead); // Trigger notification sending

    // Verify that the service method was called with the correct lead data
    expect(mockLeadService.sendNotification).toHaveBeenCalledWith(lead);
    expect(component.lead?.notificationSent).toBe(true); // Ensure that notificationSent is updated
  });

  it('should handle error while sending notification', () => {
    // Mock lead data
    const lead = {
      id: '1',
      name: 'John Doe',
      phoneNumber: '555-1234',
      email: 'john@example.com',
      zipCode: '12345',
      receivedAt: new Date().toISOString(),
      notificationSent: false,
    };

    // Simulate an error when sending notification
    mockLeadService.sendNotification.and.returnValue(throwError('Error sending notification'));

    component.sendNotification(lead); // Attempt to send notification

    expect(component.lead?.notificationSent).toBe(false);  // Ensure notificationSent remains false on failure
  });
});
