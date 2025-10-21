import * as z from "zod";

// npm install @langchain/anthropic to call the model
import { createAgent, tool } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


process.loadEnvFile(".env")

const getWeather = tool(
  ({ city }) => `It's always sunny in ${city}!`,
  {
    name: "get_weather",
    description: "Get the weather for a given city",
    schema: z.object({
      city: z.string(),
    }),
  },
);

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-pro",
  apiKey: process.env.GOOGLE_API_KEY? process.env.GOOGLE_API_KEY : "",
}); 

const agent = createAgent({ 
  model,
  tools: [getWeather]
});

console.log(
  await agent.invoke({
    messages: [{ role: "user", content: "What's the weather in Tokyo?" }],
  })
);