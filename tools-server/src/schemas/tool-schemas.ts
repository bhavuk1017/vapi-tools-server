// VAPI Tool Schemas
// These define the tools available to the assistant during calls

export const TOOL_SCHEMAS = [
  {
    type: 'function' as const,
    function: {
      name: 'recordPayment',
      description: 'Records payment details when customer has already made a payment that may not be reflected in the system yet',
      parameters: {
        type: 'object',
        properties: {
          paymentDate: {
            type: 'string',
            description: 'Date when payment was made (YYYY-MM-DD format)'
          },
          paymentMode: {
            type: 'string',
            enum: ['cash', 'check', 'credit_card', 'debit_card', 'bank_transfer', 'online', 'upi'],
            description: 'Method of payment used by customer'
          },
          amount: {
            type: 'number',
            description: 'Amount paid in dollars'
          },
          confirmationNumber: {
            type: 'string',
            description: 'Transaction or confirmation number if customer has it'
          }
        },
        required: ['paymentDate', 'paymentMode', 'amount']
      }
    },
    server: {
      url: `${process.env.SERVER_URL}/api/tools`
    },
    messages: [
      {
        type: 'request-start' as const,
        content: 'Let me verify that payment information in our system...'
      },
      {
        type: 'request-complete' as const,
        content: 'I\'ve recorded your payment details.'
      },
      {
        type: 'request-failed' as const,
        content: 'I\'m having trouble recording that payment. Let me try again.'
      }
    ]
  },
  {
    type: 'function' as const,
    function: {
      name: 'checkSettlementEligibility',
      description: 'Checks if the customer\'s account qualifies for a settlement offer based on account age and status',
      parameters: {
        type: 'object',
        properties: {
          accountNumber: {
            type: 'string',
            description: 'Customer\'s account number'
          },
          currentBalance: {
            type: 'number',
            description: 'Current outstanding balance'
          }
        },
        required: []
      }
    },
    server: {
      url: `${process.env.SERVER_URL}/api/tools`
    },
    messages: [
      {
        type: 'request-start' as const,
        content: 'Let me check if you qualify for any special settlement offers...'
      },
      {
        type: 'request-complete' as const,
        content: 'I\'ve checked your account status.'
      }
    ]
  },
  {
    type: 'function' as const,
    function: {
      name: 'createPromiseToPay',
      description: 'Creates a payment commitment record when customer promises to pay by a specific date',
      parameters: {
        type: 'object',
        properties: {
          promiseDate: {
            type: 'string',
            description: 'Date customer commits to pay (YYYY-MM-DD format)'
          },
          promiseAmount: {
            type: 'number',
            description: 'Amount customer commits to pay in dollars'
          },
          customerPhone: {
            type: 'string',
            description: 'Customer contact number for follow-up confirmation'
          }
        },
        required: ['promiseDate', 'promiseAmount']
      }
    },
    server: {
      url: `${process.env.SERVER_URL}/api/tools`
    },
    messages: [
      {
        type: 'request-start' as const,
        content: 'Let me set up that payment commitment for you...'
      },
      {
        type: 'request-complete' as const,
        content: 'Perfect! I\'ve recorded your payment commitment.'
      }
    ]
  },
  {
    type: 'function' as const,
    function: {
      name: 'offerSettlement',
      description: 'Retrieves and presents settlement offer details to customer including reduced amount and discount percentage',
      parameters: {
        type: 'object',
        properties: {
          accountNumber: {
            type: 'string',
            description: 'Customer\'s account number'
          },
          customerResponse: {
            type: 'string',
            enum: ['interested', 'not_interested', 'needs_time'],
            description: 'Customer\'s initial response to settlement mention'
          }
        },
        required: []
      }
    },
    server: {
      url: `${process.env.SERVER_URL}/api/tools`
    },
    messages: [
      {
        type: 'request-start' as const,
        content: 'Let me pull up the settlement details for you...'
      },
      {
        type: 'request-complete' as const,
        content: 'Great news! I have a settlement offer available.'
      }
    ]
  },
  {
    type: 'function' as const,
    function: {
      name: 'scheduleCallback',
      description: 'Schedules a future callback to the customer for follow-up on the account',
      parameters: {
        type: 'object',
        properties: {
          callbackDate: {
            type: 'string',
            description: 'Date for callback (YYYY-MM-DD format)'
          },
          callbackTime: {
            type: 'string',
            description: 'Preferred time for callback (e.g., "10:00 AM", "2:30 PM")'
          },
          reason: {
            type: 'string',
            description: 'Reason for callback (e.g., "promise to pay reminder", "follow up on settlement")'
          },
          customerPhone: {
            type: 'string',
            description: 'Phone number to call'
          }
        },
        required: ['callbackDate', 'reason']
      }
    },
    server: {
      url: `${process.env.SERVER_URL}/api/tools`
    },
    messages: [
      {
        type: 'request-start' as const,
        content: 'Let me schedule that callback for you...'
      },
      {
        type: 'request-complete' as const,
        content: 'I\'ve scheduled your callback.'
      }
    ]
  },
  {
    type: 'endCall' as const,
    function: {
      name: 'end_call',
      description: 'End the call gracefully after completing the conversation and documenting the outcome'
    }
    // Note: endCall is a built-in VAPI tool - no server URL or messages needed
  }
];

// Export individual tool definitions for easier reference
export const RECORD_PAYMENT_TOOL = TOOL_SCHEMAS[0];
export const CHECK_SETTLEMENT_TOOL = TOOL_SCHEMAS[1];
export const CREATE_PTP_TOOL = TOOL_SCHEMAS[2];
export const OFFER_SETTLEMENT_TOOL = TOOL_SCHEMAS[3];
export const SCHEDULE_CALLBACK_TOOL = TOOL_SCHEMAS[4];
export const END_CALL_TOOL = TOOL_SCHEMAS[5];
