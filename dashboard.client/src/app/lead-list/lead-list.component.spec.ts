import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadListComponent } from './lead-list.component';
import { LeadService } from '../lead.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';  // Import RxJS utilities for testing

// Begin testing suite for LeadListComponent
describe('LeadListComponent', () => {
  let component: LeadListComponent;
  let fixture: ComponentFixture<LeadListComponent>;
  let leadService: LeadService;  // Declare a mock LeadService
  let snackBar: MatSnackBar;     // Declare a mock MatSnackBar
  let router: Router;           // Declare a mock Router

  beforeEach(async () => {
    // Set up testing module and provide necessary dependencies
    await TestBed.configureTestingModule({
      declarations: [LeadListComponent],  // Declare the component under test
      providers: [
        { provide: LeadService, useValue: { getLeads: jest.fn(), sendNotification: jest.fn() } },  // Mock the LeadService
        { provide: Router, useValue: { navigate: jest.fn() } },  // Mock the Router
        { provide: MatSnackBar, useValue: { open: jest.fn() } }  // Mock MatSnackBar for testing notifications
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LeadListComponent);  // Create the component fixture
    component = fixture.componentInstance;  // Get the component instance
    leadService = TestBed.inject(LeadService);  // Inject the mock LeadService
    snackBar = TestBed.inject(MatSnackBar);    // Inject the mock MatSnackBar
    router = TestBed.inject(Router);          // Inject the mock Router

    fixture.detectChanges();  // Trigger change detection
  });

  it('should create', () => {
    // Test if the component is created successfully
    expect(component).toBeTruthy();
  });

  it('should call getLeads on ngOnInit', () => {
    // Mock the response of getLeads method
    const mockLeads = [
      { id: '1', name: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', zipCode: '12345', receivedAt: '2025-01-01T12:00:00', notificationSent: false },
      { id: '2', name: 'Jane Smith', phoneNumber: '0987654321', email: 'jane@example.com', zipCode: '54321', receivedAt: '2025-01-02T12:00:00', notificationSent: false }
    ];

    leadService.getLeads = jest.fn().mockReturnValue(of(mockLeads));  // Mock the getLeads method to return mock data

    component.ngOnInit();  // Trigger ngOnInit to test data fetching
    fixture.detectChanges();  // Detect changes

    expect(leadService.getLeads).toHaveBeenCalled();  // Verify that getLeads was called
    expect(component.leads.length).toBe(2);  // Verify that leads were populated
  });

  it('should handle error when getLeads fails', () => {
    // Mock getLeads to throw an error
    leadService.getLeads = jest.fn().mockReturnValue(throwError(() => new Error('Failed to fetch leads')));

    component.ngOnInit();  // Trigger ngOnInit to test data fetching
    fixture.detectChanges();  // Detect changes

    expect(component.leads.length).toBe(0);  // Verify that leads are empty
    expect(snackBar.open).toHaveBeenCalledWith('❌ Failed to load leads.', 'Close', { duration: 4000, panelClass: ['custom-snackbar'], verticalPosition: 'top' });
  });

  it('should navigate to lead detail on row click', () => {
    const lead = { id: '1', name: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', zipCode: '12345', receivedAt: '2025-01-01T12:00:00', notificationSent: false };

    component.onRowClick(lead);  // Trigger row click
    expect(router.navigate).toHaveBeenCalledWith(['/lead', lead.id]);  // Verify navigation to the lead detail page
  });

  it('should send notification and update lead when sendNotification is called', () => {
    const lead = { id: '1', name: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', zipCode: '12345', receivedAt: '2025-01-01T12:00:00', notificationSent: false };

    leadService.sendNotification = jest.fn().mockReturnValue(of({}));  // Mock the sendNotification method to return a success response

    component.sendNotification(lead);  // Trigger sendNotification
    expect(lead.notificationSent).toBe(true);  // Verify that notificationSent was set to true
    expect(snackBar.open).toHaveBeenCalledWith('📩 SMS/Email notification sent successfully!', 'Close', { duration: 4000, panelClass: ['custom-snackbar'], verticalPosition: 'top' });
  });

  it('should handle error when sendNotification fails', () => {
    const lead = { id: '1', name: 'John Doe', phoneNumber: '1234567890', email: 'john@example.com', zipCode: '12345', receivedAt: '2025-01-01T12:00:00', notificationSent: false };

    leadService.sendNotification = jest.fn().mockReturnValue(throwError(() => new Error('Failed to send notification')));  // Mock the sendNotification method to return an error

    component.sendNotification(lead);  // Trigger sendNotification
    expect(snackBar.open).toHaveBeenCalledWith('❌ Failed to send notification.', 'Close', { duration: 4000, panelClass: ['custom-snackbar'], verticalPosition: 'top' });
  });
});
1
