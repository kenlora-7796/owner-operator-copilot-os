# Owner Operator Copilot OS

# Database Schema

Version: 1.0

Status: Active Development

---

# Purpose

This document defines the logical data model for Owner Operator Copilot OS.

The database is organized around business domains rather than technical tables.

This approach mirrors how owner-operators think about their businesses and keeps the architecture scalable.

---

# Design Principles

Every business object should:

- Have a unique identity
- Be independently searchable
- Support AI reasoning
- Be linkable to the Business Graph
- Generate Activity Timeline events when changed

---

# Business Domains

## Drivers

Stores information about drivers.

Example Fields

- Driver ID
- Name
- CDL Number
- Phone
- Email
- License Expiration
- Medical Card Expiration
- Assigned Truck
- Status

---

## Equipment

### Trucks

Example Fields

- Truck ID
- Unit Number
- VIN
- Make
- Model
- Year
- License Plate
- Insurance
- Registration
- Status

---

### Trailers

Example Fields

- Trailer ID
- Trailer Number
- VIN
- Type
- Inspection Date
- Status

---

## Operations

### Loads

Example Fields

- Load Number
- Broker
- Customer
- Pickup
- Delivery
- Rate
- Miles
- Status
- Assigned Driver
- Assigned Truck

---

### Stops

- Pickup
- Delivery
- Fuel Stop
- Scale
- Rest Break

---

### Routes

- Origin
- Destination
- Planned Miles
- Actual Miles
- Estimated Drive Time

---

## Documents

Stores every uploaded document.

Example Fields

- Document ID
- Type
- File Name
- Upload Date
- OCR Status
- Classification
- Related Load
- Related Broker
- Related Customer

---

## Finance

### Invoices

- Invoice Number
- Customer
- Amount
- Due Date
- Status

### Expenses

- Fuel
- Maintenance
- Tolls
- Meals
- Lodging
- Miscellaneous

### Settlements

- Settlement ID
- Payment Date
- Total Revenue
- Total Expenses
- Net Profit

---

## Compliance

Stores regulatory information.

Examples

- DOT
- IFTA
- Insurance
- Medical Cards
- Permits
- Registration

---

## AI

### Conversations

Stores Copilot conversations.

### Recommendations

Stores AI recommendations awaiting review or completed.

### Memory

Stores long-term AI memory and learned relationships.

---

## System

### Activity Timeline

Stores every significant event.

### Notifications

Stores reminders and alerts.

### Workflows

Tracks workflow execution and state.

---

# Relationships

Drivers

↓

Assigned To

↓

Truck

↓

Assigned To

↓

Load

↓

Generates

↓

Documents

↓

Creates

↓

Invoice

↓

Included In

↓

Settlement

---

# Future Expansion

The schema is designed to support:

- Multi-company organizations
- Fleet management
- Team permissions
- Broker portals
- Customer portals
- AI automation
- Predictive analytics

---

# Engineering Goal

The database should represent the business, not just store data.

Every entity should support:

- AI reasoning
- Workflow automation
- Business Graph relationships
- Audit history
- Analytics