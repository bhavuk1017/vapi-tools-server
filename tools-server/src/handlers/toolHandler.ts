import { Request, Response } from 'express';
import { ToolCallRequest, ToolResponse } from '../types/tool.types';
import * as tools from '../tools';
import { logger } from '../utils/logger';

export async function toolHandler(req: Request, res: Response): Promise<void> {
  try {
    // Log full request body for debugging
    logger.debug('[Tool Handler] Full request body:', JSON.stringify(req.body, null, 2));

    const requestData = req.body as ToolCallRequest;
    const { toolCallList } = requestData.message;

    logger.info(`[Tool Handler] Received ${toolCallList.length} tool call(s)`);

    const results = [];

    for (const toolCall of toolCallList) {
      logger.debug(`[Tool Handler] Tool call object:`, JSON.stringify(toolCall, null, 2));

      // Extract name and arguments from nested structure
      const toolName = toolCall.function?.name;
      const toolArguments = toolCall.function?.arguments || {};

      logger.info(`[Tool Handler] Executing: ${toolName}`);
      logger.info(`[Tool Handler] Parameters:`, JSON.stringify(toolArguments, null, 2));

      try {
        // Handle built-in VAPI tools (like endCall) that don't trigger webhooks
        if (!toolName) {
          logger.info(`[Tool Handler] Skipping tool with undefined name (likely built-in VAPI tool)`);
          results.push({
            toolCallId: toolCall.id,
            result: 'Call ended successfully'
          });
          continue;
        }

        // Get the tool function
        const toolFunction = (tools as any)[toolName];

        if (!toolFunction) {
          logger.error(`[Tool Handler] Unknown tool: ${toolName}`);
          results.push({
            toolCallId: toolCall.id,
            result: `Error: Unknown tool ${toolName}. Please contact support.`
          });
          continue;
        }

        // Execute the tool with nested arguments
        const toolResult = await toolFunction(toolArguments, requestData.message);

        logger.info(`[Tool Handler] Tool result:`, JSON.stringify(toolResult, null, 2));

        // VAPI expects result to be a string that the assistant reads to the user
        // If tool returns an object with a message field, extract it
        let resultString: string;
        if (typeof toolResult === 'string') {
          resultString = toolResult;
        } else if (toolResult && typeof toolResult === 'object') {
          // Extract the message field if it exists, otherwise stringify the object
          resultString = toolResult.message || JSON.stringify(toolResult);
        } else {
          resultString = String(toolResult);
        }

        logger.info(`[Tool Handler] Sending result string:`, resultString);

        results.push({
          toolCallId: toolCall.id,
          result: resultString
        });

      } catch (error) {
        logger.error(`[Tool Handler] Error executing ${toolName}:`, error);
        results.push({
          toolCallId: toolCall.id,
          result: `I encountered an error processing that request. Please try again or let me transfer you to a representative.`
        });
      }
    }

    const response: ToolResponse = { results };
    logger.debug('[Tool Handler] Sending response:', JSON.stringify(response, null, 2));
    res.json(response);

  } catch (error) {
    logger.error('[Tool Handler] Fatal error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
