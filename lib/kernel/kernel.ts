export function initializeKernel() {
  return {
    status: "initialized",
    initializedAt: new Date().toISOString(),
  };
}