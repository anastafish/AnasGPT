'use client'
import { useState, useEffect} from "react";
import {Button, TextField, Dialog} from "@mui/material"
import { useAuthContext } from "@/context/AuthContext"
import signUp from "@/firebase/auth/signup";
import signinWithGoogle from "@/firebase/auth/googleSignin";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Header from "@/components/Header";

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (user != null) router.push("/chat")
    }, [user])

    const [email, setEmail] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [dialog, setDialog] = useState(false)


    const handleGoogleSignin = async () => {
        const {result, error} = await signinWithGoogle()

        if (error) {
            return;
        }
        return router.push('/chat')
    }

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password, username);

        if (error) {
            setDialog(true)
            return;
        }
        // else successful
        return router.push("/chat")
    }
    return (
        <div className='w-[100vw] h-[100vh] flex flex-col gap-10'>
            <Header />
            <Dialog open={dialog}>
            <div className='p-5 flex flex-col justify-center items-center'>
                <h1>User Already exists</h1>
                <Button onClick={() => setDialog(false)}>Close</Button>
            </div>
        </Dialog>
            <Head>
                <title>
                    Signup
                </title>
            </Head>
        <div className="flex sm:flex-row flex-col w-full items-center justify-between sm:h-full sm:gap-0 gap-10">
            <div className='h-fit w-full flex flex-col items-center justify-center'>
                <h1 className='text-center sm:text-[50px] text-[36px] font-extrabold'>
                    Welcome to AnasGPT
                    </h1>
                <h1 className='text-center sm:text-[32px] text-[28px] font-semibold'>
                    Signup for a Free account Now!
                    </h1>
            </div>
            <div className="w-full flex flex-col items-center justify-center gap-5">
                    <form
                        onSubmit={handleForm}
                        className="flex flex-col items-center justify-center">
                            <label htmlFor="username">
                            <p>Full Name</p>
                            <TextField
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                type="text"
                                name="username"
                                id="username"
                                placeholder="username"
                                />
                        </label>
                        <label htmlFor="email">
                            <p>Email</p>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                type="email"
                                name="email"
                                id="email"
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
                        <Button
                             type="submit"
                             style={{padding:15}}>
                                Sign up
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
                    <h1>Already have an account?
                        <Link
                        href={'/login'}
                        className='text-blue-400'>
                        Login
                        </Link>
                    </h1>
            </div>
        </div>
    </div>
    );
}

export default Page;