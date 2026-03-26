export interface ToolCallRequest {
  message: {
    type: string;
    toolCallList: ToolCall[];
    call?: {
      id: string;
      orgId: string;
      type: string;
    };
  };
}

export interface ToolCall {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: Record<string, any>;
  };
  isPrecededByText?: boolean;
}

export interface ToolResult {
  toolCallId: string;
  result: string; // VAPI expects a string that the assistant reads to the user
}

export interface ToolResponse {
  results: ToolResult[];
}

export interface ToolFunction {
  (params: Record<string, any>, metadata?: any): Promise<any>;
}
