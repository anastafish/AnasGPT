import React from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/context/AuthContext'
import signOutUser from '@/firebase/auth/signOutUser'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

function Header() {
  const { user } = useAuthContext()
  const router = useRouter()
  

  return (
    <header className='w-full flex top-0 items-center justify-between gap-5 bg-green-300 p-5'>
            <Link href={'/'} className='text-[20px] font-bold'>
              Home
            </Link>
            <div className='flex items-center gap-5'>
              {user ? <Link href={'/chat'} className='text-[20px] font-bold'>
                Chat
              </Link>
              : <Link href={'/login'} className='text-[20px] font-bold'>
                Login
                </Link>}
                {user ? 
                <Button 
                  onClick={() => signOutUser(router)} 
                  style={{backgroundColor:'red', color:'black'}}
                  
                  >
                SignOut
              </Button> : <Link href={'/signup'} className='text-[20px] font-bold'>
                  Signup
                </Link>}
            </div>
          </header>
  )
}

export default Header