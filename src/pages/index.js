import { useRef, useEffect } from "react"
import { useChat } from 'ai/react'
import { TextField } from "@mui/material"
import Head from "next/head"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const bottomRef = useRef(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-row items-start justify-center w-[100vw]">
      <Head>
        <title>AnasGPT</title>
      </Head>
      <div className="h-[100vh] w-[10%] bg-green-300"></div>
      <div 
        className="flex flex-col items-center justify-start
         w-[80%] max-h-[80vh] overflow-scroll no-scrollbar gap-3 py-5">
          {messages.map(m => (
          <div key={m.id} className={`text-center text-[20px] p-3 w-full ${m.role === 'assistant' ? 'bg-slate-500' : ''}`}>
            {m.content}
          </div>
        ))}
        {messages.length === 0 && <h1 className="sm:text-[35px] md:text-[30px] md:max-w-[400px] sm:max-w-none max-w-[250px] text-[20px] text-center absolute bottom-[50%]">
           Welcome to AnasGPT How Can i Help You Today? 
           </h1>}
        <div ref={bottomRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="absolute bottom-16 w-[50%]">
          <TextField
          fullWidth
          placeholder='Enter a Prompt'
            value={input}
            onChange={handleInputChange}
          />
      </form>
      <div className="h-[100vh] w-[10%] bg-green-300"></div>
    </div>
  )
}