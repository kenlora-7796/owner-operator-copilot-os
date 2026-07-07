import { workspaceData } from "./workspace-data";

export class WorkspaceService {
  getWorkspace() {
    return workspaceData;
  }
}

export const workspaceService = new WorkspaceService();