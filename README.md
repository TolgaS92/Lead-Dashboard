
# Lead Management Dashboard

This project is a Lead Management Dashboard that receives and displays leads from third-party providers via a webhook mechanism. It consists of a .NET Core backend (API) and an Angular frontend (dashboard UI).

## Project Overview

This project enables real-time lead management by allowing third-party providers to push lead information via webhooks, storing the data in memory, and displaying it through a user-friendly dashboard. The application includes the ability to simulate sending SMS/Email notifications to leads who have given permission to be contacted.

## Project Structure

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

## Features
- ✅ Receive leads in real-time via Webhook
- ✅ Store leads in an in-memory collection (no database required)
- ✅ Display leads in a user-friendly Angular Dashboard
- ✅ Send simulated SMS/Email notifications based on lead permissions

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/TolgaS92/your-repo.git
cd Dashboard
```

### 2. Run the Backend (API)
```
cd Dashboard.Server
# Restore dependencies
dotnet restore

# Run the API
dotnet run
```
The API should now be running on `http://localhost:5156`.

### 3. Run the Frontend (Angular App)
```
cd dashboard.client
# Install dependencies
npm install

# Start the Angular app
ng serve --open
```
The frontend should now be running at `http://localhost:4200`.

## API Endpoints

| Method | Endpoint                           | Description                                              | Request Body Example                                                                                      | Response Example                           |
|--------|------------------------------------|----------------------------------------------------------|------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| POST   | /api/leads                         | Receive a new lead                                       | `{ "name": "John Doe", "phone": "555-1234", "zip": "90210", "email": "john@example.com", "permissionToContact": true }` | 200 OK if lead is received successfully    |
| GET    | /api/leads                         | Get all leads                                            | N/A                                                                                                        | `[ { "id": 1, "name": "John Doe", "phone": "555-1234", ... }]` |
| GET    | /api/leads/{id}                    | Get lead by ID                                           | N/A                                                                                                        | `{ "id": 1, "name": "John Doe", "phone": "555-1234", ... }` |
| POST   | /api/leads/send-notification       | Send simulated SMS/Email notification                    | `{ "leadId": 1 }`                                                                                           | 200 OK if notification is simulated       |

## Technologies Used

- **Backend**: .NET Core 8, C#, ASP.NET Web API
- **Frontend**: Angular, TypeScript, Material UI
- **Database**: In-memory collection
- **Dev Tools**: Git, Visual Studio, Visual Studio Code, Node.js, npm
- **Testing**: NUnit for unit testing

## Contributing

Feel free to submit issues or create pull requests. Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions, reach out to tolgasecme@icloud.com.
