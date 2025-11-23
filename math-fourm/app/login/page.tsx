import { signIn } from "@/auth"
import { auth } from "@/auth"
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
import Navbar from "@/components/navbar"

export default async function SignIn({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const params = await searchParams
    const error = params?.error

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar username="Guest"></Navbar>
            <div className="flex justify-center items-center">
                <form
                    action={async (formData) => {
                        "use server"
                        await signIn("credentials", formData)
                    }}
                >
                    <Card className='w-[500px] bg-gray-100'>
                        <CardHeader>
                            <CardTitle className='text-center text-2xl'>Sign In</CardTitle>
                            <CardAction>
                                <Link href="/signup">
                                    Sign Up
                                </Link>
                            </CardAction>
                            {error && (
                                <Alert className="w-full mt-6" variant="destructive">
                                    <AlertCircleIcon className="h-4 w-4" />
                                    <AlertTitle>Account Not Found</AlertTitle>
                                    <AlertDescription>
                                        Please check your username and password.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardHeader>
                        <CardContent className='pt-6'>
                            <div className='flex flex-col items-center gap-4'>
                                <div className='w-full max-w-[475px]'>
                                    <label htmlFor='username'>Username</label>
                                    <Input id="username" name="username" type="text" />
                                </div>
                                <div className='w-full max-w-[475px]'>
                                    <label htmlFor='password'>Password</label>
                                    <Input id="password" name="password" type="password" />
                                </div>
                                <Button className='w-full max-w-[475px] bg-rose-100 hover:bg-rose-200 text-color-black' type="submit">
                                    Sign In
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <input type="hidden" name="redirectTo" value="/" />
                </form>
            </div>
        </div>
    )
}