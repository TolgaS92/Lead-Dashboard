using Dashboard.Server.Models;

namespace Dashboard.Server.Repositories
{
    public class LeadRepository : ILeadRepository
    {
        private readonly List<Lead> _leads = new();

        public void AddLead(Lead lead)
        {
            _leads.Add(lead);
        }

        public List<Lead> GetAllLeads()
        {
            return _leads;
        }

        public Lead? GetLeadById(Guid id)
        {
            return _leads.FirstOrDefault(l => l.Id == id);
        }

        public void UpdateLead(Lead lead)
        {
            var existingLead = _leads.FirstOrDefault(l => l.Id == lead.Id);
            if (existingLead != null)
            {
                existingLead.NotificationSent = lead.NotificationSent;
            }
        }
    }

}
