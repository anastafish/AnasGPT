import { useRef, useEffect, useState } from "react"
import { useChat } from 'ai/react'
import { useAuthContext } from "@/context/AuthContext"
import { TextField, Button } from "@mui/material"
import { getAuth } from "firebase/auth";
import signOutUser from "@/firebase/auth/signOutUser";
import { useRouter } from "next/navigation"
import Head from "next/head"
import Link from "next/link";
import Header from "@/components/Header";


export default function Chat() {
    const { user } = useAuthContext()
    const router = useRouter()    

    useEffect(() => {
        if (user == null) router.push("/login")
    }, [user])

  const [finished, setFinished] = useState(true)
  const { messages, input, handleInputChange, handleSubmit} = useChat({
    onFinish:() => setFinished(true),
    onError:() => (err => console.log(err)),
    initialMessages:[{role:'user', content:`you are an assistent to a user named ${user.displayName.split(' ')[0]}`}]
  })

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-200">      
      <Head>
        <title>AnasGPT</title>               
      </Head>
      <Header />
      <div className="flex flex-col items-center justify-center w-full gap-5">
        <div
          className="flex flex-col items-center justify-start
           w-full h-[70vh] overflow-scroll no-scrollbar gap-3 py-5">
            {messages.slice(1).map(m => (
            <div key={m.id} className={`text-center text-[20px] p-3 w-full font-extrabold
             ${m.role === 'assistant' ? 'bg-slate-500' : ''}`}
             >
              <h1 >{m.content}</h1>
            </div>
          ))}
          {messages.slice(1).length === 0 && <h1 className="sm:text-[30px] md:text-[50px] md:max-w-[500px] sm:max-w-none max-w-[250px] text-[40px] text-center absolute bottom-[50%]">
             Welcome to <strong>AnasGPT</strong> <br/> Ask me anything!
             </h1>}
          <div ref={bottomRef}></div>
        </div>
        <form 
          onSubmit={(e) => {
            handleSubmit(e)
            setFinished(false)  
          }}
          className=" w-[70%]">
            <TextField
            focused={true}
            autoFocus={true}
            disabled={finished ? false : true}
            fullWidth
            placeholder={`${finished ? 'Ask Me Anything' : 'Wait...'}`}
              value={input}
              onChange={handleInputChange}
            />
        </form>
      </div>
    </div>
  )}
