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

        /// <summary>
        /// Constructor to inject the lead repository dependency.
        /// </summary>
        /// <param name="leadRepository">The repository for managing leads.</param>
        public LeadController(ILeadRepository leadRepository)
        {
            _leadRepository = leadRepository;
        }

        /// <summary>
        /// Receives a new lead via webhook and adds it to the repository.
        /// </summary>
        /// <param name="lead">The lead data from the webhook request.</param>
        /// <returns>Response indicating whether the lead was successfully received.</returns>
        [HttpPost]
        public IActionResult ReceiveLead([FromBody] Lead lead)
        {
            // Validate incoming lead data
            if (string.IsNullOrEmpty(lead.Name) || string.IsNullOrEmpty(lead.PhoneNumber) || string.IsNullOrEmpty(lead.ZipCode))
            {
                return BadRequest("Invalid lead data: Name, PhoneNumber, and ZipCode are required.");
            }

            try
            {
                // Add the lead to the repository
                _leadRepository.AddLead(lead);

                // Simulate sending SMS/Email notification (for logging purposes)
                string message = $"Simulated: SMS/Email sent to {lead.PhoneNumber}";
                Console.WriteLine(message);  // Log the message for monitoring

                // Return a success response with lead information
                return Ok(new { Message = "Lead received successfully", Notification = message, LeadId = lead.Id });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.Error.WriteLine($"Error while receiving lead: {ex.Message}");
                return StatusCode(500, "Internal server error while processing the lead.");
            }
        }

        /// <summary>
        /// Retrieves all leads from the repository.
        /// </summary>
        /// <returns>List of all leads.</returns>
        [HttpGet]
        public IActionResult GetAllLeads() => Ok(_leadRepository.GetAllLeads());

        /// <summary>
        /// Retrieves a single lead by its ID.
        /// </summary>
        /// <param name="id">The ID of the lead to retrieve.</param>
        /// <returns>The lead if found, otherwise a NotFound response.</returns>
        [HttpGet("{id}")]
        public IActionResult GetLeadById(Guid id)
        {
            // Log the request to fetch a specific lead
            Console.WriteLine($"Fetching lead with ID: {id}");

            // Retrieve the lead from the repository
            var lead = _leadRepository.GetLeadById(id);

            // Check if the lead exists and return the appropriate response
            return lead is null ? NotFound("Lead not found") : Ok(lead);
        }

        /// <summary>
        /// Sends a notification (SMS or Email) to the lead.
        /// </summary>
        /// <param name="lead">The lead data to send notification to.</param>
        /// <returns>A response indicating whether the notification was sent successfully.</returns>
        [HttpPost("send-notification")]
        public IActionResult SendNotification([FromBody] Lead lead)
        {
            // Validate the incoming lead data
            if (lead == null)
            {
                return BadRequest("Lead data is required.");
            }

            try
            {
                // Simulate sending an SMS or Email based on available contact information
                string notificationType = string.Empty;

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

                // Update the lead's notification status
                lead.NotificationSent = true;

                // Persist the updated lead in the repository
                _leadRepository.UpdateLead(lead);

                // Return a success message with the notification type and lead details
                return Ok(new
                {
                    lead,
                    message = $"{notificationType} notification sent successfully to {lead.Name}."
                });
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.Error.WriteLine($"Error while sending notification: {ex.Message}");
                return StatusCode(500, "Internal server error while sending notification.");
            }
        }
    }
}
