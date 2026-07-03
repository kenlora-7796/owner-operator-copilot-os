export type WorkflowName =
  | "document_upload"
  | "rate_confirmation_review"
  | "proof_of_delivery_review"
  | "invoice_preparation"
  | "compliance_check";

export interface WorkflowDefinition {
  name: WorkflowName;
  title: string;
  description: string;
  requiresApproval: boolean;
  steps: string[];
}

export const workflowRegistry: Record<WorkflowName, WorkflowDefinition> = {
  document_upload: {
    name: "document_upload",
    title: "Document Upload",
    description: "Processes a newly uploaded document.",
    requiresApproval: false,
    steps: ["created", "processing", "completed"],
  },

  rate_confirmation_review: {
    name: "rate_confirmation_review",
    title: "Rate Confirmation Review",
    description: "Reviews a rate confirmation and prepares dispatch recommendations.",
    requiresApproval: true,
    steps: ["created", "document_review", "dispatch_review", "approval", "completed"],
  },

  proof_of_delivery_review: {
    name: "proof_of_delivery_review",
    title: "Proof of Delivery Review",
    description: "Reviews POD and prepares billing workflow.",
    requiresApproval: true,
    steps: ["created", "document_review", "billing_review", "approval", "completed"],
  },

  invoice_preparation: {
    name: "invoice_preparation",
    title: "Invoice Preparation",
    description: "Prepares an invoice for owner approval.",
    requiresApproval: true,
    steps: ["created", "billing_review", "approval", "completed"],
  },

  compliance_check: {
    name: "compliance_check",
    title: "Compliance Check",
    description: "Checks compliance-related information and creates reminders if needed.",
    requiresApproval: false,
    steps: ["created", "compliance_review", "completed"],
  },
};