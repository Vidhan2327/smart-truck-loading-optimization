🚚 Smart Truck Loading & Optimization System

A time-based, capacity-aware logistics optimization platform that intelligently batches shipments into trucks based on route, time window, weight, and volume—ensuring maximum utilization and minimum trips.

Built for real-world logistics constraints, scalability, and hackathon-grade clarity.

🔗 Live Deployments

Backend (Render)
https://smart-truck-loading-optimization-3.onrender.com/

⚠️ Please open once to wake the server (cold start)

Frontend (Render)
https://smart-truck-loading-dp9l.onrender.com/

📌 Problem Statement

Traditional logistics systems often assign one truck per shipment, leading to:

Low truck utilization

Higher operational costs

Increased carbon emissions

Inefficient dispatch cycles

This project solves the problem by batching multiple shipments into a single truck using:

Time-based batching windows

Capacity & volume constraints

Route matching

Automated dispatch and reuse

🚀 Key Features
✅ Time-Based Truck Batching

Shipments are collected within a 15-minute batching window

After the window expires, the truck is automatically dispatched

Travel is simulated for 15 minutes

Truck becomes reusable after completion

✅ Capacity & Volume Optimization

Each truck has:

Capacity (kg)

Volume (m³)

Each shipment consumes both:

Weight

Volume

The system:

Prevents overloading

Stops accepting shipments once limits are reached

Ensures realistic constraints

✅ Multi-Shipment per Truck

One truck can carry multiple shipments

All shipments must:

Share the same route

Fit within remaining capacity & volume

Be accepted within the batching window

Only one trip is counted per dispatch

✅ Automatic Reuse & Trip Tracking

After delivery:

All shipments are marked Delivered

Truck capacity & volume are reset

Truck becomes Available

tripsCompleted increments correctly

✅ Role-Based System

Warehouse

Creates shipments

Requests optimized truck allocation

Dealer

Adds trucks

Accepts shipment requests

System (Cron Jobs)

Handles automatic dispatch

Handles delivery completion

Manages truck reuse

🧠 Optimization Logic (How It Works)
1️⃣ Shipment Acceptance

A shipment is matched with a truck based on:

Route

Remaining capacity

Remaining volume

On acceptance:

Capacity & volume are deducted

Truck enters batching window

2️⃣ Automated Dispatch

A cron job runs every minute and checks:

Trucks whose batching window has expired

Truck state changes:

Available → En Route

3️⃣ Completion & Reuse

After simulated travel time:

All shipments → Delivered

Truck resets:

Capacity

Volume

Availability

tripsCompleted += 1

⏱️ Timing Model
Phase	Duration
Shipment batching	15 min
Travel time	15 min
Total cycle	~30 min
🏗️ Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Node-Cron

Frontend

React

Axios

Tailwind CSS

React Router

Toast Notifications

📂 Core Data Models
Truck

Capacity (kg)

Volume (m³)

Remaining capacity & volume

Route

Status (Available / En Route)

Trips completed

Shipment

Weight & volume

Pickup & destination

Status lifecycle

Linked truck

🧪 Example Scenario

Truck

Capacity: 1000 kg

Volume: 10 m³

Shipments

Shipment A: 400 kg / 4 m³

Shipment B: 500 kg / 5 m³

Shipment C: 300 kg / 3 m³

Result

Shipment A + B → Accepted

Shipment C → Rejected (capacity exceeded)

One trip completed

Truck reused after delivery

🎯 Why This Solution Is Effective

Maximizes truck utilization

Reduces number of trips

Lowers operational and environmental costs

Scales naturally with demand

Mirrors real-world logistics workflows

Clean separation of concerns:

Warehouse

Dealer

System automation

🏁 Conclusion

This project demonstrates how time-window batching combined with capacity & volume constraints can significantly improve logistics efficiency.

It is:

Production-logical

Hackathon-ready

Scalable and extensible

Future extensions include:

CO₂ emission tracking

Dynamic pricing

AI-based route optimization

🏁 Hackathon Context

Built specifically for the Flipr Hackathon, following:

Clean architecture

Scalable backend design

Real-world business logic

Production-ready practices
