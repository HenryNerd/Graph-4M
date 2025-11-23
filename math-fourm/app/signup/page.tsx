'use server'
import { create_account } from '@/app/actions/create_account'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import Navbar from '@/components/navbar'
import { auth } from "@/auth"
import Link from "next/link"

export default async function SignupPage() {
    const session = await auth();
    const username = session?.user?.name || "Guest";

    return (
        <div className='bg-gray-200 min-h-screen'>
            <Navbar username={username}></Navbar>
            <div className='flex justify-center items-center'>
                <Card className='w-[500px] bg-gray-100'>
                    <CardHeader>
                        <CardTitle className='text-center text-2xl'>Sign Up</CardTitle>
                        <CardAction>
                        <Link href="/login" className=''>
                            Sign In
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent className='pt-6'>
                    <form action={create_account} className='flex flex-col items-center gap-4'>
                        <div className='w-full max-w-[475px]'>
                            <label htmlFor='realname'>Name</label>
                            <Input id="realname" name="realname" />
                        </div>
                        <div className='w-full max-w-[475px]'>
                            <label htmlFor='username'>Username</label>
                            <Input id="username" name="username" />
                        </div>
                        <div className='w-full max-w-[475px]'>
                            <label htmlFor="password">Password</label>
                            <Input type="password" id="password" name="password" />
                        </div>
                        <Button className='w-full max-w-[475px] bg-rose-100 hover:bg-rose-200 text-color-black' type="submit">Sign up</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
        </div >
    )
}