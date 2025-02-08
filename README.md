
# Lead Management Dashboard

This project is a **Lead Management Dashboard** that receives and displays leads from third-party providers via a webhook mechanism. It consists of a .NET Core backend (API) and an Angular frontend (dashboard UI).

### Project Structure
```
Dashboard/
│── Dashboard.Server/          # .NET Core Web API (Backend)
│   ├── Dashboard.Server.csproj
│   ├── Controllers/
│   ├── Services/
│   ├── Models/
│   ├── Program.cs
│   ├── appsettings.json
│
│── dashboard.client/          # Angular Application (Frontend)
│   ├── dashboard.client.esproj
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
```

### Features
✅ **Receive leads in real-time** via Webhook  
✅ **Store leads** in an in-memory collection (no database required)  
✅ **Display leads** in a user-friendly Angular Dashboard  
✅ **Send simulated SMS/Email notifications**  

### Getting Started

#### 1. Clone the Repository
```bash
git clone https://github.com/TolgaS92/your-repo.git
cd Dashboard
```

#### 2. Run the Backend (API)
```bash
cd Dashboard.Server
# Restore dependencies
dotnet restore

# Run the API
dotnet run
```
The API should now be running at [http://localhost:5156](http://localhost:5156).

#### 3. Run the Frontend (Angular App)
```bash
cd dashboard.client
# Install dependencies
npm install

# Start the Angular app
ng serve --open
```
The frontend should now be running at [http://localhost:4200](http://localhost:4200).

---

### API Endpoints

| Method | Endpoint                | Description                                         |
|--------|-------------------------|-----------------------------------------------------|
| POST   | `/api/leads`             | Receive a new lead via webhook                      |
| GET    | `/api/leads`             | Get all leads                                      |
| GET    | `/api/leads/{id}`        | Get lead details by ID                             |
| POST   | `/api/leads/send-notification` | Simulate sending an SMS/email notification to a lead |

#### **POST /api/leads** - Receive a New Lead
- **Description**: This endpoint receives lead data from third-party providers, including the lead's name, phone number, zip code, email address (optional), and whether the lead has opted in to receive communications (`OptInForCommunication`).
  
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "phoneNumber": "555-1234",
    "zipCode": "12345",
    "email": "johndoe@example.com",
    "optInForCommunication": true
  }
  ```

- **Response**:
  ```json
  {
    "status": "Success",
    "message": "Lead received successfully",
    "notification": "Simulated: SMS/Email sent to 555-1234",
    "leadId": "1"
  }
  ```

#### **GET /api/leads** - Get All Leads
- **Description**: This endpoint retrieves all the leads stored in the system.
  
- **Response**:
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "phoneNumber": "555-1234",
      "zipCode": "12345",
      "email": "johndoe@example.com",
      "optInForCommunication": true
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "phoneNumber": "555-5678",
      "zipCode": "67890",
      "optInForCommunication": false
    }
  ]
  ```

#### **GET /api/leads/{id}** - Get Lead by ID
- **Description**: Retrieves detailed information for a specific lead identified by the ID.
  
- **Response**:
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "phoneNumber": "555-1234",
    "zipCode": "12345",
    "email": "johndoe@example.com",
    "optInForCommunication": true
  }
  ```

#### **POST /api/leads/send-notification** - Send Simulated Notification (SMS/Email)
- **Description**: Simulates sending a notification (SMS/Email) to a lead based on whether they opted in and have valid contact info (PhoneNumber or Email).
  
- **Request Body**:
  ```json
  {
    "id": "1"
  }
  ```

- **Response**:
  ```json
  {
    "lead": {
      "id": "1",
      "name": "John Doe",
      "phoneNumber": "555-1234",
      "zipCode": "12345",
      "email": "johndoe@example.com",
      "optInForCommunication": true
    },
    "message": "SMS notification sent successfully to John Doe."
  }
  ```

---

### Technologies Used

- **Backend**: .NET Core 8, C#, ASP.NET Web API
- **Frontend**: Angular, TypeScript, Material UI
- **Dev Tools**: Git, Visual Studio, Visual Studio Code

---

### Contributing

Feel free to submit issues or create pull requests. Contributions are welcome!

---

### License

MIT License

---

### Contact

For questions, reach out to tolgasecme@icloud.com.
