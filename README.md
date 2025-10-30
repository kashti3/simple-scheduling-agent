# Simple Scheduling Agent

A simple scheduling agent that demonstrates AI-powered conversation and tool usage. The agent can check availability, schedule appointments, and manage bookings through natural language interaction with Google's Gemini API. 

Unlike typical LLM function calling where the model executes tools directly, this implementation gives you explicit control - the LLM suggests which tool to use, but you execute it manually.
This approach provides better visibility into the agent's decision-making process and is ideal for learning how AI agents work under the hood.

## Features

- Natural language conversation with context retention
- Appointment scheduling and management
- Availability checking
- Automatic task completion through multiple tool calls

## Examples

### Basic Conversation
```
You: Is the sky blue?
Gemini: I can't see if the sky is blue, so I don't know.
You: Usually? 
Gemini: Yes, usually the sky is blue during the day if there aren't clouds blocking the sun.
```

### Tool Usage
```
You: Hi
Gemini: Hello
You: check availability for tomorrow at 10AM
Checking availability for date: 1991-04-03 10:00:00 // this is a tool call!
```

### Complex Interactions
```
You: schedule an appointment for tomorrow at 6am
Checking availability for date: April 3rd, 1991
Scheduling appointment for date: April 3rd, 1991
Gemini: Your appointment for April 3rd, 1991 has been scheduled.

You: actually, move it to 9:45 in the evening
Deleting appointment for date: April 3rd, 1991
Checking availability for date: April 3rd, 1991
Scheduling appointment for date: April 3rd, 1991
Gemini: Your appointment has been moved to April 3rd, 1991 at 9:45 PM. I'm finished.
```

## How to Run

1. Clone the repository:
```bash
git clone https://github.com/kashti3/simple-scheduling-agent.git
cd simple-scheduling-agent
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

4. Run the agent:
```bash
npm run dev
```

5. Start interacting with the agent through the command line!
