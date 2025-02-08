# Lead Management Dashboard

This project is a **Lead Management Dashboard** that receives and displays leads from third-party providers via a webhook mechanism. It consists of a **.NET Core backend (API)** and an **Angular frontend (dashboard UI)**.

## **Project Structure**
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

## **Features**
✅ Receive leads in real-time via Webhook
✅ Store leads in **in-memory collection** (no database required)
✅ Display leads in a user-friendly **Angular Dashboard**
✅ Send simulated **SMS/Email notifications**

---

## **Getting Started**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/your-repo.git
cd Dashboard
```

### **2. Run the Backend (API)**
```sh
cd Dashboard.Server
# Restore dependencies
 dotnet restore

# Run the API
 dotnet run
```
The API should now be running on `http://localhost:5156`.

### **3. Run the Frontend (Angular App)**
```sh
cd dashboard.client
# Install dependencies
npm install

# Start the Angular app
ng serve --open
```
The frontend should now be running at `http://localhost:4200`.

---

## **API Endpoints**
| Method | Endpoint | Description |
|--------|-------------|-------------|
| **POST** | `/api/leads` | Receive a new lead |
| **GET** | `/api/leads` | Get all leads |
| **GET** | `/api/leads/{id}` | Get lead by ID |
| **POST** | `/api/leads/send-notification` | Send simulated SMS/Email notification |

---

## **Technologies Used**
- **Backend**: .NET Core 8, C#, ASP.NET Web API
- **Frontend**: Angular, TypeScript, Material UI
- **Dev Tools**: Git, Visual Studio, Visual Studio Code

---

## **Contributing**
Feel free to submit issues or create pull requests. Contributions are welcome!

---

## **License**
MIT License

---

## **Contact**
For questions, reach out to **your-email@example.com**.

