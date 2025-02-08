using Dashboard.Server.Models;

namespace Dashboard.Server.Repositories
{
    /// <summary>
    /// Defines the contract for the lead repository.
    /// Implementations should provide functionality for managing leads.
    /// </summary>
    public interface ILeadRepository
    {
        /// <summary>
        /// Adds a new lead to the repository.
        /// </summary>
        /// <param name="lead">The lead to be added.</param>
        void AddLead(Lead lead);

        /// <summary>
        /// Retrieves all leads from the repository.
        /// </summary>
        /// <returns>A list of all leads.</returns>
        List<Lead> GetAllLeads();

        /// <summary>
        /// Retrieves a lead by its unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the lead.</param>
        /// <returns>The lead with the specified ID, or null if not found.</returns>
        Lead? GetLeadById(Guid id);

        /// <summary>
        /// Updates the details of an existing lead.
        /// </summary>
        /// <param name="lead">The lead with updated information.</param>
        void UpdateLead(Lead lead);
    }
}
