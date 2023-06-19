import React, { useEffect } from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useAuthContext } from '@/context/AuthContext'
import { useRef } from 'react'
import {motion, useInView} from 'framer-motion'
import Link from 'next/link'

function index() {

  const router = useRouter()
  const { user } = useAuthContext()
  const ref = useRef(null)
  const isInView = useInView(ref, {once:true})

  const featuerContent = [
    {title:'Natural Language Understanding', main:'AnasGPT comprehends and responds accurately to your queries.'},
    {title:'Personalized Experience', main:'AnasGPT tailors conversations to your preferences, creating a unique user experience.'},
    {title:'Knowledgeable and Informative', main:"Tap into AnasGPT's vast knowledge across various domains."}
  ]

  const featureStyles = {
    h1:'sm:text-[25px] md:text-[30px] text-[20px] text-center font-bold',
    div:' flex items-center justify-center p-4 flex-col border-[2px] rounded-md border-black sm:w-[30%] w-full h-full bg-gray-400'
  }


  return (
    <div className='flex flex-col items-center justify-center overflow-hidden bg-slate-200'>      
      <Head>
        <title>AnasGPT - Your Intelligent Conversational Companion</title>
      </Head>
        <div className='h-[100vh] flex flex-col items-center justify-between gap-5'>          
          <Header />
          <motion.div 
            className='flex flex-col items-center justify-center h-full gap-5'
            initial={{x:1500}}
              animate={{x:0}}
              transition={{duration:2}} 
            >
            <h1
              className='sm:text-[50px] text-[30px] max-w-[70%] text-center'                           
              >
                Welcome To <strong className='font-extrabold'>AnasGPT</strong>
             - Your Intelligent Conversational Companion!
             </h1>
             <Button
             onClick={() => router.push(`${user ? '/chat' : '/signup'}`)}
              size='large'
              color='primary'
              variant='outlined'
              style={{fontSize:'25px', fontWeight:800}}
              >Try it Now for Free!</Button>
          </motion.div>
        </div>
        <div 
          className='h-[100vh] flex flex-col items-center justify-center gap-5 p-5'
          >
          <motion.div 
            className='flex flex-col items-center justify-center gap-20 h-full'
            ref={ref}
            >
              <motion.h1 
                className='sm:text-[50px] text-[35px] text-center'
                initial={{opacity:0}}
                animate={isInView ? {opacity:1} : {opacity:0}}
                transition={{delay:0.5, duration:1}}
                >
                Why <strong>AnasGPT</strong>?
                </motion.h1>
              <div className='w-full flex sm:flex-row flex-col items-center justify-center gap-3'>
                {featuerContent.map((feature, index) => {
                  return (
                    <motion.div 
                    className={featureStyles.div}
                    animate={isInView ? {opacity:1, x:[700, 0]} : {opacity:0}}
                    transition={{delay: 0.5 * index, duration:1}}
                  >
                  <h1 className={featureStyles.h1}>{feature.title}</h1>
                  <p className='text-center text-[20px]'>{feature.main}</p>
                </motion.div>  
                  )
                }) }
              </div>
          </motion.div>
        </div>
    </div>
  )
}

export default index