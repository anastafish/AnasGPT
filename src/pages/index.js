import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useAuthContext } from '@/context/AuthContext'
import { useRef } from 'react'
import {motion, useInView} from 'framer-motion'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation';

function index() {

  const router = useRouter()
  const { user } = useAuthContext()
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const secondIsInView = useInView(secondRef, {once:true})
  const firstIsInView = useInView(firstRef, {once:true})

  const featuerContent = [
    {title:'Natural Language Understanding', main:'AnasGPT comprehends and responds accurately to your queries.'},
    {title:'Personalized Experience', main:'AnasGPT tailors conversations to your preferences, creating a unique user experience.'},
    {title:'Knowledgeable and Informative', main:"Tap into AnasGPT's vast knowledge across various domains."}
  ]

  const featureStyles = {
    h1:'sm:text-[25px] md:text-[30px] text-[20px] text-center font-bold text-white',
    div:' flex items-center justify-center p-4 flex-col border-[2px] rounded-md border-black sm:w-[30%] w-full h-full bg-gray-400'
  }

  const [y, setY] = useState(0);
  const [color, setColor] = useState('#EBEDEF')

  useEffect(() => {
    if (y < 100) setColor('#EBEDEF')
        else if (y > 100 && y < 200) setColor('#D6DBDF')
        else if (y > 200 && y < 300) setColor('#D6DBDF');
        else if (y > 300 && y < 400) setColor('#85929E');
        else if (y > 400 && y < 500) setColor('#5D6D7E');
        else if (y > 500 && y < 600) setColor('#34495E');
        else if (y > 600 && y < 700) setColor('#2E4053');
        else if (y > 700 && y < 800) setColor('#283747');
        else if (y > 800 && y < 900) setColor('#212F3C');
        else if (y > 900 && y < 1000) setColor('#1B2631');
        else setColor('#17202A') 
  }, [y])

  const handleNavigation = (e) => {
    const window = e.currentTarget;
    console.log(window.scrollY)
    if (y > window.scrollY) {
      console.log("scrolling up");       

    } else if (y < window.scrollY) {
      console.log("scrolling down");
    }
    setY(window.scrollY);
    console.log(color)
  };

  useEffect(() => {
    setY(window.scrollY);
  }, []);
  
  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNavigation(e));
  
  }, [y]);


  return (
    <motion.div 
      className={`flex flex-col items-center justify-center overflow-hidden`}
      initial={{backgroundColor:'#E5E7E9'}}
      animate={{backgroundColor:color}}
      transition={{duration:.5}}
      >      
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
            ref={firstRef}
            >
              <motion.h1 
                className='sm:text-[50px] text-white text-[35px] text-center'
                initial={{opacity:0}}
                animate={firstIsInView ? {opacity:1} : {opacity:0}}
                transition={{delay:0.5, duration:1}}
                >
                Why <strong>AnasGPT</strong>?
                </motion.h1>
              <div className='w-full flex sm:flex-row flex-col items-center justify-center gap-3'>
                {featuerContent.map((feature, index) => {
                  return (
                    <motion.div 
                    key={index}
                    className={featureStyles.div}
                    animate={firstIsInView ? {opacity:1, x:[700, 0]} : {opacity:0}}
                    transition={{delay: 0.5 * index, duration:1}}
                  >
                  <h1 className={featureStyles.h1}>{feature.title}</h1>
                  <p className='text-center text-[20px] text-white'>{feature.main}</p>
                </motion.div>  
                  )
                }) }
              </div>
          </motion.div>
        </div>
        <div 
          className='h-[100vh] flex flex-col items-center justify-center gap-5 p-5'
          >
          <motion.div 
            className='flex flex-col items-center gap-5'
            ref={secondRef}
            transition={{delayChildren:1}}
            >
              <motion.h1 
                className='sm:text-[50px] text-[35px] text-center text-white'
                initial={{opacity:0}}
                animate={secondIsInView ? {opacity:1} : {opacity:0}}
                transition={{duration:1}}
                >
                How to use <strong>AnasGPT</strong>?
                </motion.h1>
                <motion.ul className='flex flex-col items-center justify-center gap-5'>  
                  {secondIsInView && <TypeAnimation 
                  style={{whiteSpace: 'pre-line', fontSize:35, color:'white', textAlign:'center'}}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      '1- Signup for a free account from \n 2- Ask it Anything in your mind \n 3- Get the answer instantly!'
                    ]}
                  />  }
                  </motion.ul>
            </motion.div>
          </div>
    </motion.div>
  )
}

export default index