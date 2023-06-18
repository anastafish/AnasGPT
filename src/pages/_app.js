import '@/styles/globals.css'
import {Inter} from 'next/font/google'
import {AuthContextProvider} from '../context/AuthContext'

const inter = Inter({ subsets: ['greek'] })


export default function App({ Component, pageProps }) {

  return (
    <AuthContextProvider > 
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  
  )
}
