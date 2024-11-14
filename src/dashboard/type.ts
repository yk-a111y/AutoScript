import type { Edge, Node } from '@xyflow/react';

interface IWorkflow {
  id?: string;
  name?: string;
  description?: string;
  icon?: string;
  isDisabled?: boolean;
  extVersion?: string;
  version?: string;
  updatedAt?: number;
  createdAt?: number;
  globalData?: string;
  drawflow: IWorkflowDrawflow;
  table?: IWorkflowTabel[];
  settings?: IWorkflowSettings;
  content?: string | null;
  connectedTable?: string | null;
  trigger?: string | null;
  dataColumns?: string[];
  folderId?: string | null;
  includedWorkflows?: Record<string, unknown>;
  date?: number;
}

interface IWorkflowDrawflow {
  nodes: (Node & { label: string })[];
  edges: Edge[];
  position?: number[];
  viewport?: Record<string, number>;
  zoom: number;
}

interface IWorkflowSettings {
  blockDelay: number;
  debugMode: boolean;
  defaultColumnName: string;
  execContext: string;
  executedBlockOnWeb: boolean;
  inputAutocomplete: boolean;
  insertDefaultColumn: boolean;
  notification: boolean;
  onError: string;
  publicId: string;
  restartTimes: number;
  reuseLastState: boolean;
  saveLog: boolean;
  tabLoadTimeout?: number;
}

interface IWorkflowTabel {
  id: string;
  name: string;
  type: string;
}

export type { IWorkflow, IWorkflowDrawflow };