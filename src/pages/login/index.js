'use client'
import { useState, useEffect } from 'react';
import { useAuthContext } from "@/context/AuthContext"
import {Button, TextField, Dialog} from "@mui/material"
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import signinWithGoogle from "@/firebase/auth/googleSignin";
import Head from 'next/head';
import Header from '@/components/Header';

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user != null) router.push("/chat")
    }, [user])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [dialog, setDialog] = useState(false)
    

    const handleGoogleSignin = async () => {
        const { result, error } = await signinWithGoogle()

        if (error) {
            return console.log(error)
        }
        console.log(result)
        return router.push('/chat')
    }

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            setDialog(true)
            return;
        }

        // else successful
        return router.push("/chat")
    }
    return (
    <div className='w-[100vw] h-[100vh] justify-center flex sm:flex-row flex-col'>
        <Header />
        <Dialog open={dialog}>
            <div className='p-5 flex flex-col justify-center items-center'>
                <h1>Email or Password are incorrect</h1>
                <Button onClick={() => setDialog(false)}>Close</Button>
            </div>
        </Dialog>
        <Head>
            <title>
                Login
            </title>
            </Head>
        <div className='sm:h-full h-[50%] w-full flex flex-col items-center justify-center'>
            <h1 className='text-center sm:text-[50px] text-[36px] font-extrabold'>
                Welcome to AnasGPT
                </h1>
            <h1 className='text-center sm:text-[32px] text-[28px] font-semibold'>
                Login to your account
                </h1>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center gap-4">
                <form
                    onSubmit={handleForm}
                    className="flex flex-col items-center justify-center">
                    <label htmlFor="email">
                        <p>Email</p>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                             />
                    </label>                    
                    <Button
                        type="submit"
                        style={{padding:15}}>
                            Login
                    </Button>
                    <div className='flex items-center justify-center gap-5 w-full'>
                        <Image
                            alt='google-logo'
                            className='cursor-pointer'
                            src={'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'}
                            width={30}
                            height={30}
                            onClick={handleGoogleSignin}
                            />
                    </div>
                </form>
                <h1>Don't have an account?
                    <Link
                        href={'/signup'}
                        className='text-blue-400'
                        >
                        SignUp
                    </Link>
                </h1>
        </div>
    </div>
    );
}

export default Page;