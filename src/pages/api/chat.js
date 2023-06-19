import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
import { NextResponse } from 'next/server'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.API_KEY
})
const openai = new OpenAIApi(config)
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'
 
export default async function POST(req) {
  // Extract the `messages` from the body of the request
  try{
    const { messages } = await req.json()
 
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages
    })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream) 
  }
  catch (err) {
    return NextResponse.json('There was an Error try again ):')
  }
  
}