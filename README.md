LoadSmart – Smart Truck Loading Optimization System

Flipr Hackathon Project
 Overview

LoadSmart is a full-stack logistics platform designed to streamline the interaction between warehouses and truck dealers.
The system enables secure registration, role-based access, and sets the foundation for intelligent shipment-to-truck matching and optimization.

This project is being developed as part of the Flipr Hackathon.

🎯 Problem Statement

In logistics operations, warehouses often struggle to efficiently allocate shipments to available trucks, while truck dealers lack a centralized system to manage and expose their fleet.

LoadSmart aims to:

Digitize warehouse and dealer onboarding

Provide role-based dashboards

Enable future optimization of shipment loading and truck utilization

🧱 Tech Stack
Frontend

React (Vite)

Tailwind CSS

React Router DOM

Axios

Backend

Node.js

Express.js

MongoDB Atlas

JWT Authentication (httpOnly cookies)

✅ Features Implemented (Current)
Authentication & Authorization

User registration

User login & logout

JWT-based authentication using httpOnly cookies

Role-based access control:

Warehouse

Dealer

Frontend

Intro / landing page

Login page

Register page with role selection

Role-specific dashboards (placeholder UI)

Axios-based auth service with credentials enabled

Backend

Secure auth APIs

Password hashing

Auth middleware extracting userId and role

Clean app/server separation

Stable local development setup

🚧 Features In Progress / Planned

Warehouse onboarding (company, location, manager details)

Dealer onboarding (truck types, service areas)

Shipment management

Truck management

Shipment–truck matching and optimization logic

Deployment setup (Render / Railway)

📁 Project Structure
Flipr_Hackathon/
├── Backend/
│   ├── App.js
│   ├── Server.js
│   ├── Controllers/
│   ├── Routes/
│   ├── Models/
│   └── Middleware/
│
├── Frontend/
│   ├── src/
│   │   ├── Pages/
│   │   ├── Services/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

⚙️ Local Setup Instructions
1️⃣ Clone the Repository
git clone <repository-url>
cd Flipr_Hackathon

2️⃣ Backend Setup
cd Backend
npm install


Create a .env file inside Backend/:

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key


Start backend server:

npm run dev
# or
node Server.js


Backend runs on:

http://127.0.0.1:5000

3️⃣ Frontend Setup
cd ../Frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication Notes

JWT is stored in httpOnly cookies

withCredentials: true is enabled in Axios

Local development uses 127.0.0.1 to avoid Node.js IPv6 issues on Windows

Production deployment will switch host binding to 0.0.0.0

👥 Team Collaboration

Code is managed via GitHub

.env files are intentionally excluded

Teammates should create their own .env locally

Branching and collaboration supported via Git

📌 Project Status

🚧 In Progress
Core authentication and structure completed.
Domain models, onboarding flows, and optimization logic coming next.

🏁 Hackathon Context

This project is being built specifically for the Flipr Hackathon, following clean architecture, scalable design, and production-ready practices.
