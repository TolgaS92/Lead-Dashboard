namespace Dashboard.Server.Models
{
    public class Lead
    {
        // Unique identifier for the lead, automatically generated as a GUID
        public Guid Id { get; set; } = Guid.NewGuid();

        // Name of the lead (e.g., full name)
        public string Name { get; set; }

        // Phone number of the lead
        public string PhoneNumber { get; set; }

        // Zip code associated with the lead
        public string ZipCode { get; set; }

        // Flag indicating if the lead has opted in to receive communication
        public bool OptInForCommunication { get; set; }

        // Email address of the lead, which may be null
        public string? Email { get; set; }

        // Timestamp indicating when the lead was received, default is the current UTC time
        public DateTime ReceivedAt { get; set; } = DateTime.UtcNow;

        // Flag indicating if a notification (SMS/Email) has been sent to the lead
        public bool NotificationSent { get; set; } = false;
    }
}
