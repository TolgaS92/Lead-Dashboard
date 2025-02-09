
# Lead Management Dashboard

This project is a Lead Management Dashboard that receives and displays leads from third-party providers via a webhook mechanism. It consists of a .NET Core backend (API) and an Angular frontend (dashboard UI).

## Project Structure
```bash
Lead Management Dashboard/
│── Dashboard.Server/            # .NET Core Web API (Backend)
│   ├── Dashboard.Server.csproj  # Project file
│   ├── Controllers/             # Contains API Controllers
│   ├── Services/                # Business logic/services
│   ├── Models/                  # Data models (e.g., Lead)
│   ├── Program.cs               # Entry point for the API
│   ├── appsettings.json         # Configuration file
│
│── dashboard.client/            # Angular Application (Frontend)
│   ├── dashboard.client.esproj  # Angular project file
│   ├── src/                     # Source code folder
│   ├── angular.json             # Angular project configuration
│   ├── package.json             # Dependencies and scripts
│   ├── tsconfig.json            # TypeScript configuration
```

## Features

✅ Receive leads in real-time via Webhook  
✅ Store leads in in-memory collection (no database required)  
✅ Display leads in a user-friendly Angular Dashboard  
✅ Send simulated SMS/Email notifications  

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/TolgaS92/your-repo.git
   cd Dashboard
   ```

2. **Run the Backend (API)**

   ```bash
   cd Dashboard.Server
   # Restore dependencies
   dotnet restore
   # Run the API
   dotnet run
   ```

   The API should now be running on `http://localhost:5156`.

3. **Run the Frontend (Angular App)**

   ```bash
   cd dashboard.client
   # Install dependencies
   npm install
   # Start the Angular app
   ng serve --open
   ```

   The frontend should now be running at `http://localhost:4200`.

## API Endpoints

| Method | Endpoint                 | Description                                        |
|--------|--------------------------|----------------------------------------------------|
| POST   | /api/leads                | Receive a new lead                                 |
| GET    | /api/leads                | Get all leads                                      |
| GET    | /api/leads/{id}           | Get lead by ID                                     |
| POST   | /api/leads/send-notification | Send simulated SMS/Email notification             |

## Technologies Used

- Backend: .NET Core 8, C#, ASP.NET Web API
- Frontend: Angular, TypeScript, Material UI
- Dev Tools: Git, Visual Studio, Visual Studio Code

## Documentation
### **Backend API Overview**
The backend is built using **ASP.NET Core 8** and exposes a RESTful API to handle lead management.

### Functional Specification
#### **Webhook Endpoint (Receive Leads)**
```http
POST /api/leads
```
**Request Body:**
```json
{
  "name": "John Doe",
  "phoneNumber": "435-456-7890",
  "zipCode": "89675",
  "optInForCommunication": true,
  "email": "johmdoe@example.com"
}```
**Response:**
```json
{
  "message": "Lead received successfully"
}
```

#### **Retrieve All Leads**
```http
GET /api/leads
```
**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "123-456-7890",
    "zipCode": "90210",
    "receivedAt": "2025-02-07T10:00:00Z"
  }
]
```

#### **Retrieve Lead by ID**
```http
GET /api/leads/{id}
```

#### **Send Notification**
```http
POST /api/leads/send-notification
```
**Response:**
```json
{
  "message": "Notification sent successfully"
}
```

#### How the API Works
- **POST /api/leads**: Receives a new lead from third-party providers via webhook. The body of the request must include the lead's `Name`, `PhoneNumber`, `ZipCode`, `OptInForCommunication`, and an optional `Email`. The API validates the lead data and adds it to an in-memory collection.
- **GET /api/leads**: Returns all the leads stored in memory.
- **GET /api/leads/{id}**: Returns the details of a specific lead identified by its unique `Id`.
- **POST /api/leads/send-notification**: Simulates the process of sending a notification (SMS/Email) to the lead based on whether they have opted in for communication.

#### Pushing Leads via Webhook
1. Third-party lead providers will send lead data to the API via the **POST /api/leads** endpoint.
2. The API receives the lead information and processes it, ensuring all necessary data (Name, PhoneNumber, ZipCode) is included.
3. A success response is sent back to the provider with the lead’s ID and a confirmation message.

#### Notification Workflow
1. Upon receiving a new lead, the API simulates sending an SMS and/or Email notification based on the `OptInForCommunication` flag.
2. If the lead has opted in, the API will simulate sending an SMS to the phone number or an Email to the provided email address.
3. The status of the notification is logged, and the lead's `NotificationSent` flag is updated.

### User Guide for the UI

#### Viewing the Lead List
1. Navigate to the frontend dashboard (`http://localhost:4200`).
2. The main screen displays a list of all leads that have been received via webhook.
3. Each entry shows the lead's `Name`, `PhoneNumber`, and `ZipCode`.

#### Viewing Lead Details
1. Click on any lead from the list to view more details, including the `Email` and `PhoneNumber`, `OptInForCommunication`, and the timestamp (`ReceivedAt`).

#### Simulating Notifications
1. The UI includes a button to simulate sending an SMS/Email notification for a specific lead.
2. When clicked, the backend API is called to trigger the notification process. A message will appear confirming the action.

## Contributing

Feel free to submit issues or create pull requests. Contributions are welcome!

## License

MIT License

## Contact

For questions, reach out to tolgasecme@icloud.com.
