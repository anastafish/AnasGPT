import React from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useAuthContext } from '@/context/AuthContext'

function index() {

  const router = useRouter()
  const { user } = useAuthContext()

  return (
    <div className='flex flex-col items-center justify-center'>
      <Head>
        <title>AnasGPT - Your Intelligent Conversational Companion</title>
      </Head>
        <div className='h-[100vh] flex flex-col items-center justify-between gap-5'>
          <Header />
          <div className='flex flex-col items-center justify-center h-full gap-5'>
            <h1
              className='sm:text-[50px] text-[30px] max-w-[70%] text-center'>
                Welcome To <strong className='font-extrabold'>AnasGPT</strong>
             - Your Intelligent Conversational Companion!</h1>
             <Button
             onClick={() => router.push(`${user ? '/chat' : '/signup'}`)}
              size='large'
              color='primary'
              variant='outlined'
              style={{fontSize:'25px', fontWeight:800}}
              >Try it Now for Free!</Button>
          </div>
        </div>
    </div>
  )
}

export default index