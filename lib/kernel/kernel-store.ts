import type { TimelineEntry } from "../timeline";

interface KernelStore {
  timeline: TimelineEntry[];
}

const globalForKernel = globalThis as unknown as {
  ownerOperatorKernelStore?: KernelStore;
};

export const kernelStore =
  globalForKernel.ownerOperatorKernelStore ??
  (globalForKernel.ownerOperatorKernelStore = {
    timeline: [],
  });