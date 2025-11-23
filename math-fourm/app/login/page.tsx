import { signIn } from "@/auth"
import { auth } from "@/auth"
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code"
import { redirect } from "next/navigation"
import { AlertCircleIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'

export default async function SignIn() {
    // const session = await auth()
    // console.log(session)
    return (
        <form
            action={async (formData) => {
                "use server"
                await signIn("credentials", formData)
            }}
        >
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Acount Not Found</AlertTitle>
                <AlertDescription>
                    Please check your username and password.
                </AlertDescription>
            </Alert>
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
                    <form className='flex flex-col items-center gap-4'>
                        <div className='w-full max-w-[475px]'>
                            <label htmlFor='realname'>Username</label>
                            <Input name="username" type="text" />
                        </div>
                        <div className='w-full max-w-[475px]'>
                            <label htmlFor='username'>Password</label>
                            <Input name="password" type="password" />
                        </div>
                        <Button className='w-full max-w-[475px] bg-rose-100 hover:bg-rose-200 text-color-black' type="submit">Sign up</Button>
                    </form>
                </CardContent>
            </Card>
            <input type="hidden" name="redirectTo" value="/" />
            <label>
                Email
                <input name="username" type="text" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    )
}