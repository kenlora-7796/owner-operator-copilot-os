import type { WorkspaceData } from "./workspace-types";

export const workspaceData: WorkspaceData = {
  metrics: [
    {
      id: "revenue",
      title: "Revenue Today",
      value: "$2,850",
      subtitle: "+12% projected",
    },
    {
      id: "loads",
      title: "Active Loads",
      value: "4",
      subtitle: "2 waiting approval",
    },
    {
      id: "documents",
      title: "Documents",
      value: "8",
      subtitle: "6 processed",
    },
    {
      id: "compliance",
      title: "Compliance",
      value: "92%",
      subtitle: "DVIR due today",
    },
  ],

  employees: [
    {
      id: "dispatcher",
      name: "Dispatcher",
      role: "Dispatch Coordinator",
      status: "working",
      summary: "2 loads ready",
    },
    {
      id: "bookkeeper",
      name: "Bookkeeper",
      role: "Finance",
      status: "working",
      summary: "Invoice prepared",
    },
    {
      id: "compliance",
      name: "Compliance",
      role: "Safety",
      status: "waiting",
      summary: "DVIR required",
    },
    {
      id: "documents",
      name: "Documents",
      role: "OCR",
      status: "working",
      summary: "8 processed",
    },
  ],

  workQueue: [
    {
      id: "approval",
      title: "Approve Dispatch",
      description: "Rate Confirmation waiting.",
      priority: "high",
    },
    {
      id: "invoice",
      title: "Review Invoice",
      description: "Invoice generated.",
      priority: "medium",
    },
  ],

  documents: [
    {
      id: "rate-confirmation",
      name: "Rate Confirmation",
      status: "Processing",
      icon: "📄",
    },
    {
      id: "fuel-receipt",
      name: "Fuel Receipt",
      status: "Completed",
      icon: "⛽",
    },
    {
      id: "pod",
      name: "Proof of Delivery",
      status: "Needs Review",
      icon: "📦",
    },
  ],

  loads: [
    {
      id: "load-1",
      lane: "Jackson, MS → Dallas, TX",
      rate: "$2,850",
      status: "Ready",
    },
    {
      id: "load-2",
      lane: "Memphis, TN → Atlanta, GA",
      rate: "$1,900",
      status: "Review",
    },
  ],

  compliance: [
    {
      id: "dvir",
      label: "DVIR",
      status: "Due Today",
      color: "text-amber-400",
    },
    {
      id: "insurance",
      label: "Insurance",
      status: "Active",
      color: "text-emerald-400",
    },
    {
      id: "ifta",
      label: "IFTA",
      status: "On Track",
      color: "text-emerald-400",
    },
  ],
};