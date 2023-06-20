import '@/styles/globals.css'
import {Poppins} from 'next/font/google'

import {AuthContextProvider} from '../context/AuthContext'

const poppins = Poppins({ subsets: ['latin'], weight:'800' })


export default function App({ Component, pageProps }) {

  return (
    <AuthContextProvider > 
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  
  )
}
