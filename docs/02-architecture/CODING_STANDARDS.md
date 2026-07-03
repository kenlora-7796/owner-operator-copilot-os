# Owner Operator Copilot OS

# Coding Standards

Version: 1.0

Status: Active Development

---

# Purpose

This document defines coding conventions for Owner Operator Copilot OS.

The goal is consistency.

---

# TypeScript

Use TypeScript for all application logic.

Prefer explicit types for shared objects.

Avoid using `any` unless absolutely necessary.

Use `unknown` when data shape is not yet known.

---

# File Naming

Use kebab-case for folders and files.

Good:

```txt
copilot-agent/
document-agent/
agent-core.ts
workflow-engine.ts
timeline-service.ts
```

Avoid:

```txt
CopilotAgent/
DocumentAgent/
AgentCore.ts
```

---

# Function Naming

Use action-based names.

Examples:

```ts
runCopilotAgent()
runDocumentAgent()
createWorkflow()
createTimelineEvent()
```

---

# Imports

Prefer clean relative imports inside nearby modules.

Use shared exports when helpful.

Example:

```ts
export { runCopilotAgent } from "./copilot-agent";
```

---

# Comments

Use comments to explain why something exists.

Do not comment obvious code.

Good:

```ts
// High-risk actions require approval before execution.
```

Avoid:

```ts
// Set status to completed.
```

---

# AI Agent Standard

Every agent should:

- Accept clear input
- Create an `AgentTask`
- Use `runAgentTask`
- Return an `AgentResult`
- Explain reasoning
- Respect approval rules

---

# Error Handling

Errors should be clear and user-safe.

Do not expose sensitive technical details to users.

---

# Code Quality Rule

Readable code is more valuable than clever code.