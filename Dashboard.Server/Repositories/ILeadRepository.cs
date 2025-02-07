using Dashboard.Server.Models;

namespace Dashboard.Server.Repositories
{
    public interface ILeadRepository
    {
        void AddLead(Lead lead);
        List<Lead> GetAllLeads();
        Lead? GetLeadById(Guid id);
        void UpdateLead(Lead lead); // Ensure this method exists
    }

}
