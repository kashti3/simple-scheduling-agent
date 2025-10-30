import { askGeminiWithMessages } from './llmService.js';
import { getUserInput } from './cli-io.js';

var messages = [{
    role: 'model',
    parts: [{text: `You are an Smart Scheduling Assistant.
  Current date and time: ${new Date().toISOString()}
  
  You have access to three tools that my code will execute on your behalf:
  1. checkAvailability(date) -> { "available": true | false } // checks if the time at the given date is available
  2. scheduleAppointment(date) -> { "success": true | false } // returns true if the appointment was scheduled successfully, false otherwise
  3. deleteAppointment(date) -> { "success": true | false } // returns true if the appointment was deleted successfully, false otherwise
  
    ### RESPONSE FORMAT (STRICT)
    You must ALWAYS reply with a single valid JSON object.  

    ### Response Structure:
    {
        "tool": "checkAvailability" | "scheduleAppointment" | "deleteAppointment" | "message",
        "date": "YYYY-MM-DD HH:MM:SS",
        "result": { "available": true | false } | { "success": true | false } | { "success": true | false } | { "message": "your message here" }
    }

    ### Behavior Rules:
    - If the user asks to schedule an appointment and you do not know whether the requested time is available, you must first request a "checkAvailability" tool call for that date and time.
    - If the user asks to delete an appointment and you do not know whether the requested time is available, you must first request a "checkAvailability" tool call for that date and time.

    ### Parsing & Dates:
    - Resolve relative dates (e.g., "this Sunday", "Monday at 10am") to "YYYY-MM-DD HH:MM:SS" before tool calls.
    - If required info (date/time) is missing, reply with {"message": "your clarifying question"} — still JSON-only.

    ### Examples (conforming):
    - Tool call → {"tool":"checkAvailability","date":"2025-10-27 10:00:00","result":{"available":true}}
    - User reply → {"tool":"message","date":"2025-10-27 10:00:00","result":{"message":"OK. I've scheduled you for Monday at 10:00 AM."}}
    - Clarification → {"tool":"message","date":"","result":{"message":"What date and time would you like?"}}
    - Error to user → {"tool":"message","date":"2025-10-27 10:00:00","result":{"message":"I couldn't schedule that time. Would you like to try a different time?"}}
  `}]
  }];

async function main() {
while (true) {
   if(messages[messages.length - 1].role === 'model') {
    const userInput = await GetUserRequest();
    messages.push({ role: 'user', parts: [{ text: userInput }] });
   } 
   else if(messages[messages.length - 1].role === 'user') {
    const response = await askGeminiWithMessages(messages);
    if (response.tool === 'message') {
        console.log("Gemini:", response.result.message);
        messages.push({ role: 'model', parts: [{ text: JSON.stringify(response, null, 2) }] });
    }
    else {
        handleToolCall(response.tool, response.date);
    }
   }
}   
}

async function GetUserRequest (){
    const userInput = await getUserInput('You: ');
    if (userInput === 'exit') {
        console.log("Goodbye!");
        process.exit(0);
    }

    return userInput;
}

const handleToolCall = (tool, date) => {
    var result = null;
    switch(tool) {
        case 'checkAvailability':
            result = checkAvailability(date);
            break;
        case 'scheduleAppointment':
            result = scheduleAppointment(date);
            break;
        case 'deleteAppointment':
            result = deleteAppointment(date);
            break;
    }
   
    messages.push({ role: 'user', parts: [{ text: `{ "tool": "${tool}", "date": "${date}", "result": ${JSON.stringify(result)} }` }] });
}

const checkAvailability = (date) => {
    console.log("Checking availability for date:", date);
    return { available: true }
}

const scheduleAppointment = (date) => {
    console.log("Scheduling appointment for date:", date);
    return { success: true }
}

const deleteAppointment = (date) => {
    console.log("Deleting appointment for date:", date);
    return { success: true }
}

main();
