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
    <header className='w-full flex top-0 items-center justify-between gap-5 p-1'>
     <div className='flex items-center justify-center gap-5'>
       {user && <h1 className='sm:text-[20px] text-[15px]'>Welcome {user && <strong>{user.displayName && user.displayName.split(' ')[0]}</strong>}</h1>}
              <Link href={'/'} className={`sm:text-[20px] text-[17px] font-bold hover:bg-slate-300 p-3`}>
                Home
              </Link>
     </div>
            <div className='flex items-center gap-5'>
              {user ? <Link href={'/chat'} className={`sm:text-[20px] text-[17px] font-bold hover:bg-slate-300 p-3 `}>
                Chat
              </Link>
              : <Link href={'/login'} className={`sm:text-[20px] text-[17px] font-bold hover:bg-slate-300 p-3 `}>
                Login
                </Link>}
                {user ? 
                <Button 
                  onClick={() => signOutUser(router)} 
                  size='small'
                  style={{backgroundColor:'red', color:'black'}}
                  
                  >
                SignOut
              </Button> : <Link href={'/signup'} className={`sm:text-[20px] text-[17px] font-bold hover:bg-slate-300 p-3 `}>
                  Signup
                </Link>}
            </div>
          </header>
  )
}

export default Header