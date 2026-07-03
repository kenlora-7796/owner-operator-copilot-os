# Owner Operator Copilot OS

# Engineering Standards

Version: 1.0

Status: Active Development

---

# Purpose

This document defines how Owner Operator Copilot OS should be engineered.

The goal is to keep the codebase clean, scalable, readable, and consistent as the platform grows.

---

# Engineering Philosophy

We build for clarity first.

Code should be easy to understand, easy to change, and easy to debug.

Owner Operator Copilot OS is not just a prototype. It is being built as a real SaaS platform.

---

# Core Standards

## 1. Keep Business Logic Out of UI

React components should display information.

Business rules should live in:

- `lib/services`
- `lib/workflows`
- `lib/ai`
- `lib/utils`

---

## 2. Use Shared Types

Types should live in:

```txt
lib/types/
```

Examples:

- Agent types
- Workflow types
- Document types
- Load types
- Timeline types

---

## 3. Use Modular AI Agents

Each AI agent should have one responsibility.

Agents should not directly depend on each other.

The Copilot and Workflow Engine coordinate agent activity.

---

## 4. Log Important Events

Every important system action should create an Activity Timeline event.

Examples:

- Document uploaded
- AI recommendation created
- Workflow started
- User approval received
- Invoice generated
- Compliance reminder created

---

## 5. Human Approval First

High-risk actions require approval.

Examples:

- Sending invoices
- Contacting brokers
- Submitting compliance information
- Creating financial records

---

## 6. Prefer Clear Names

Good:

```ts
runDocumentAgent()
createTimelineEvent()
startWorkflow()
```

Avoid:

```ts
processData()
handleStuff()
doThing()
```

---

## 7. Keep Files Focused

Each file should have a clear purpose.

If a file becomes too large, split it into smaller modules.

---

# Folder Responsibilities

## app/

Next.js routes and pages.

## lib/ai/

AI agents and AI orchestration.

## lib/workflows/

Workflow definitions and workflow execution.

## lib/services/

Business services and reusable backend logic.

## lib/types/

Shared TypeScript types.

## lib/data/

Mock data, seed data, and future data access logic.

## lib/utils/

Small helper functions.

## docs/

Project documentation and architecture records.

---

# Pull Request Standard

Before merging future changes, verify:

- Code compiles
- No TypeScript errors
- Naming is clear
- Documentation updated if architecture changed
- Timeline logging considered
- Human approval considered for risky actions

---

# Engineering Goal

Every sprint should make the system more useful without making the codebase harder to understand.