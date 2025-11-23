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

export default async function SignupPage() {
    return (
        <div className='bg-gray-200'>
            <Navbar username="No Acount"></Navbar>
            <div className='flex justify-center items-center'>
                <Card className='w-[500px] bg-gray-100'>
                    <form action={create_account}>
                        <div>
                            <label htmlFor='realname'>Name</label>
                            <Input className="w=[475px]" id="realname" name="realname" />
                        </div>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <Input id="username" name="username" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Input type="password" id="password" name="password" />
                        </div>
                        <Button type="submit">Sign up</Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}