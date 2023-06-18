'use client'
import { useState, useEffect} from "react";
import {Button, TextField} from "@mui/material"
import { useAuthContext } from "@/context/AuthContext"
import signUp from "@/firebase/auth/signup";
import signinWithGoogle from "@/firebase/auth/googleSignin";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user != null) router.push("/home")
    }, [user])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleGoogleSignin = async () => {
        const {result, error} = await signinWithGoogle()

        if (error) {
            return console.log(error)
        }
        console.log(result)
        return router.push('/home')
    }

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/home")
    }
    return (
        <div className='w-[100vw] h-[100vh] flex sm:flex-row flex-col'>
            <Head>
                <title>
                    Signup
                </title>
            </Head>
        <div className='sm:h-full h-[50%] w-full flex flex-col items-center justify-center'>
            <h1 className='text-center sm:text-[50px] text-[36px] font-extrabold'>
                Welcome to AnasGPT
                </h1>
            <h1 className='text-center sm:text-[32px] text-[28px] font-semibold'>
                Signup for a Free account Now! 
                </h1>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleForm}
                    className="flex flex-col items-center justify-center gap-3">
                    <label htmlFor="email">
                        <p>Email</p>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email" id="email"
                            placeholder="example@mail.com"
                            />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password" />
                    </label>
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
                    <Button
                         type="submit"
                         style={{padding:15}}>
                            Sign up
                        </Button>
                </form>
                <h1>Already have an account?
                    <Link
                    href={'/signin'}
                    className='text-blue-400'>
                    SignIn
                    </Link>
                </h1>
        </div>
    </div>
    );
}

export default Page;