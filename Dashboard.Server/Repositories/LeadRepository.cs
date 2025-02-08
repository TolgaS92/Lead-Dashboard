using Dashboard.Server.Models;
using System.Linq;

namespace Dashboard.Server.Repositories
{
    /// <summary>
    /// Repository for managing in-memory lead storage.
    /// This class simulates database operations in a list of leads.
    /// </summary>
    public class LeadRepository : ILeadRepository
    {
        // In-memory collection to store leads
        private readonly List<Lead> _leads;

        /// <summary>
        /// Initializes a new instance of <see cref="LeadRepository"/> and preloads sample leads.
        /// </summary>
        public LeadRepository()
        {
            // Preloading sample leads for the demonstration
            _leads =
            [
                new() { Id = Guid.NewGuid(), Name = "John Doe", Email = "john.doe@example.com", PhoneNumber = "123-456-7890", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "Jane Smith", Email = "jane.smith@example.com", PhoneNumber = "987-654-3210", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "Alice Johnson", Email = "alice.johnson@example.com", PhoneNumber = "555-666-7777", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "Michael Brown", Email = "michael.brown@example.com", PhoneNumber = "444-333-2222", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "Emily Davis", Email = "emily.davis@example.com", PhoneNumber = "111-222-3333", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "Chris Wilson", Email = "chris.wilson@example.com", PhoneNumber = "666-777-8888", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "Sarah Miller", Email = "sarah.miller@example.com", PhoneNumber = "999-888-7777", NotificationSent = false },
                new() { Id = Guid.NewGuid(), Name = "David Martinez", Email = "david.martinez@example.com", PhoneNumber = "333-222-1111", NotificationSent = false }
            ];
        }

        /// <summary>
        /// Adds a new lead to the repository.
        /// </summary>
        /// <param name="lead">The lead to be added.</param>
        public void AddLead(Lead lead)
        {
            if (lead == null)
            {
                // Log error or throw exception if the lead is null
                throw new ArgumentNullException(nameof(lead), "Lead cannot be null.");
            }

            _leads.Add(lead); // Adds the lead to the in-memory collection
        }

        /// <summary>
        /// Retrieves all leads from the repository.
        /// </summary>
        /// <returns>List of leads.</returns>
        public List<Lead> GetAllLeads()
        {
            return _leads; // Returns the entire list of leads
        }

        /// <summary>
        /// Finds a lead by its unique identifier.
        /// </summary>
        /// <param name="id">The lead ID.</param>
        /// <returns>The lead if found; otherwise, null.</returns>
        public Lead? GetLeadById(Guid id)
        {
            return _leads.FirstOrDefault(l => l.Id == id); // Searches for the lead by ID
        }

        /// <summary>
        /// Updates an existing lead's notification status.
        /// </summary>
        /// <param name="lead">The updated lead object.</param>
        public void UpdateLead(Lead lead)
        {
            if (lead == null)
            {
                // Log error or throw exception if the lead is null
                throw new ArgumentNullException(nameof(lead), "Lead cannot be null.");
            }

            var existingLead = _leads.FirstOrDefault(l => l.Id == lead.Id);
            if (existingLead != null)
            {
                // Update the notification status of the lead
                existingLead.NotificationSent = lead.NotificationSent;
            }
            else
            {
                // Log error or throw exception if the lead doesn't exist
                throw new InvalidOperationException("Lead not found.");
            }
        }
    }
}