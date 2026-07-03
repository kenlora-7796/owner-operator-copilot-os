# Owner Operator Copilot OS

# Knowledge Graph

> Product Name: Business Graph
>
> Technical Name: Knowledge Graph

Version: 1.0

Status: Active Development

---

# Purpose

The Knowledge Graph is the intelligence layer of Owner Operator Copilot OS.

Rather than storing isolated records, it stores relationships between every business entity.

This allows AI to understand context instead of simply searching for data.

---

# Philosophy

Every business object is connected.

Documents are connected to loads.

Loads are connected to brokers.

Brokers are connected to customers.

Drivers are connected to trucks.

Invoices are connected to settlements.

Everything forms one connected business graph.

---

# Core Business Objects

The Business Graph contains relationships between:

- Drivers
- Trucks
- Trailers
- Loads
- Brokers
- Customers
- Documents
- Invoices
- Expenses
- Fuel Purchases
- Settlements
- Compliance Records
- AI Recommendations
- Workflow Executions

---

# Relationship Example

```text
Driver
    │
Truck
    │
Trailer
    │
Load
    │
Rate Confirmation
    │
Bill of Lading
    │
Proof of Delivery
    │
Invoice
    │
Settlement
```

---

# AI Uses the Graph

Instead of asking:

"Find invoice #1234"

AI can answer questions like:

- Show everything related to Load 456.
- Which broker paid the slowest this month?
- Which loads used Truck #17?
- Which receipts belong to this trip?
- Which documents are still missing?

---

# Graph Nodes

Examples

Driver

Truck

Trailer

Broker

Customer

Load

Invoice

Settlement

Receipt

Fuel Stop

Compliance Item

Workflow

AI Recommendation

---

# Relationships

Driver

↓

Operates

↓

Truck

Truck

↓

Assigned To

↓

Load

Load

↓

Has

↓

Rate Confirmation

Load

↓

Has

↓

Bill of Lading

Load

↓

Produces

↓

Invoice

Invoice

↓

Paid By

↓

Customer

Invoice

↓

Included In

↓

Settlement

---

# AI Advantages

The Business Graph allows AI to:

Understand context

Reduce duplicate work

Improve recommendations

Connect related documents

Generate business insights

Answer natural language questions

---

# Future Expansion

Future graph nodes may include:

Maintenance

Repairs

Tires

Fuel Cards

Employees

Payroll

Fleet Companies

Vendors

Warehouses

Shippers

Receivers

---

# Design Goal

The Business Graph should become the digital memory of the owner-operator's business.

Every document, workflow, approval, and recommendation strengthens this graph over time.