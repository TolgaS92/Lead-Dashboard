using Dashboard.Server.Models;
using Dashboard.Server.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Server.Controllers
{
    [ApiController]
    [Route("api/leads")]
    public class LeadController : ControllerBase
    {
        private readonly ILeadRepository _leadRepository;

        public LeadController(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        [HttpPost]
        public IActionResult ReceiveLead([FromBody] Lead lead)
        {
            if (string.IsNullOrEmpty(lead.Name) || string.IsNullOrEmpty(lead.PhoneNumber) || string.IsNullOrEmpty(lead.ZipCode))
            {
                return BadRequest("Invalid lead data");
            }

            _leadRepository.AddLead(lead);
            string message = $"Simulated: SMS/Email sent to {lead.PhoneNumber}";

            Console.WriteLine(message);  // Log message
            return Ok(new { Message = "Lead received successfully", Notification = message, LeadId = lead.Id });
        }

        [HttpGet]
        public IActionResult GetAllLeads() => Ok(_leadRepository.GetAllLeads());

        [HttpGet("{id}")]
        public IActionResult GetLeadById(Guid id)
        {
            Console.WriteLine($"Fetching lead with ID: {id}");  // Log the request to check if it's being hit
            var lead = _leadRepository.GetLeadById(id);
            return lead is null ? NotFound("Lead not found") : Ok(lead);
        }

        [HttpPost("send-notification")]
        public IActionResult SendNotification([FromBody] Lead lead)
        {
            if (lead == null)
            {
                return BadRequest("Lead data is required.");
            }

            // Simulate sending SMS/Email
            lead.NotificationSent = true;

            // Determine the type of notification
            string notificationType = "";
            if (!string.IsNullOrEmpty(lead.PhoneNumber) && lead.OptInForCommunication)
            {
                notificationType = "SMS";
            }
            else if (!string.IsNullOrEmpty(lead.Email))
            {
                notificationType = "Email";
            }
            else
            {
                return BadRequest("No valid contact information for notification.");
            }

            // Persist the updated lead
            _leadRepository.UpdateLead(lead);

            // Return a success message specifying the notification type
            return Ok(new
            {
                lead,
                message = $"{notificationType} notification sent successfully to {lead.Name}."
            });
        }
    }
}
