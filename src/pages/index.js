import { useRef, useEffect } from "react"
import { useChat } from 'ai/react'
import { TextField } from "@mui/material"
import { Oswald } from 'next/font/google'
import Head from "next/head"
import AdBanner from "@/components/AdBanner"

const oswald = Oswald({subsets:['latin']})


export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const bottomRef = useRef(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-row items-center justify-center w-[100vw]">      
      <Head>
        <title>AnasGPT</title>               
      </Head>
      <AdBanner 
        data-ad-slot="7434970023"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="flex flex-col items-center justify-center w-full">
        <div
          className="flex flex-col items-center justify-start
           w-full h-[80vh] overflow-scroll no-scrollbar gap-3 py-5">
            {messages.map(m => (
            <div key={m.id} className={`text-center text-[20px] p-3 w-full font-extrabold
             ${m.role === 'assistant' ? 'bg-slate-500' : ''}`}
             >
              <h1 >{m.content}</h1>
            </div>
          ))}
          {messages.length === 0 && <h1 className="sm:text-[30px] md:text-[50px] md:max-w-[500px] sm:max-w-none max-w-[250px] text-[40px] text-center absolute bottom-[50%]">
             Welcome to <strong>AnasGPT</strong> <br/> Ask me anything!
             </h1>}
          <div ref={bottomRef}></div>
        </div>
        <form onSubmit={handleSubmit} className=" w-[50%]">
            <TextField
            fullWidth
            placeholder='Ask Me Anything'
              value={input}
              onChange={handleInputChange}
            />
        </form>
      </div>
    </div>
  )
}