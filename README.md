🚚 Smart Truck Loading & Optimization System

A time-based and capacity-aware logistics optimization platform that intelligently batches shipments into trucks based on route, time window, capacity, and volume, ensuring maximum utilization and minimal trips.

Built for hackathon use with clear business logic, scalability, and real-world constraints.

📌 Problem Statement

Traditional logistics systems often assign one truck per shipment, which leads to:

Low truck utilization

Higher operational costs

Increased carbon emissions

Inefficient dispatch cycles

This project solves the problem by batching multiple shipments into a single truck using:

Time-based windows

Capacity & volume constraints

Route matching

Automated dispatch & reuse

🚀 Key Features
✅ Time-Based Truck Batching

Shipments are collected for a 15-minute batching window

After batching, the truck is dispatched automatically

Travel is simulated for another 15 minutes

Truck becomes reusable after completion

✅ Capacity & Volume Optimization

Each truck has:

capacity (kg)

volume (m³)

Each shipment consumes capacity & volume

A truck stops accepting shipments once full

Prevents overloading automatically

✅ Multi-Shipment per Truck

One truck can carry multiple shipments

All shipments:

Share the same route

Fit within capacity & volume

Are accepted within the time window

Only one trip is counted per dispatch

✅ Automatic Reuse & Trip Tracking

After delivery:

Truck capacity & volume reset

Truck becomes available again

tripsCompleted increments correctly

✅ Role-Based System

Warehouse

Creates shipments

Requests optimized trucks

Dealer

Adds trucks

Accepts shipment requests

System (Cron)

Handles dispatch & completion automatically

🧠 How the Optimization Works
1️⃣ Shipment Acceptance

Shipment is matched to trucks by:

Route

Remaining capacity

Remaining volume

On acceptance:

Capacity & volume are deducted

Truck enters batching window

2️⃣ Dispatch (Automated)

Every minute, a cron job checks:

Trucks ready to dispatch (batching window expired)

Truck status changes:

Available → En route

3️⃣ Completion & Reuse

After travel time:

All shipments marked Delivered

Truck resets:

Capacity

Volume

Availability

tripsCompleted += 1

⏱️ Timing Model
Phase	Duration
Shipment batching	15 minutes
Travel time	15 minutes
Total cycle	~30 minutes
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

Toast notifications

📂 Core Data Models
Truck

Capacity (kg)

Volume (m³)

Remaining capacity & volume

Routes

Status (Available / En route)

Trips completed

Shipment

Weight & volume

Pickup & destination

Status lifecycle

Linked truck

🧪 Example Scenario

Truck:

Capacity: 1000 kg

Volume: 10 m³

Shipments:

Shipment A: 400 kg / 4 m³

Shipment B: 500 kg / 5 m³

Shipment C: 300 kg / 3 m³

Result:

A + B accepted

C rejected (capacity exceeded)

One trip completed

Truck reused after delivery

🎯 Why This Solution Is Effective

Maximizes truck utilization

Reduces number of trips

Scales naturally with demand

Mirrors real-world logistics constraints

Clean separation of concerns (Warehouse, Dealer, System)

🏁 Conclusion

This system demonstrates how time-window batching combined with capacity & volume constraints can significantly improve logistics efficiency.
It is production-logical, hackathon-ready, and easy to extend (CO₂ tracking, pricing optimization, AI routing).

🏁 Hackathon Context

This project is being built specifically for the Flipr Hackathon, following clean architecture, scalable design, and production-ready practices.
