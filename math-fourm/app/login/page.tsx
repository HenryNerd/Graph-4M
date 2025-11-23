import { signIn } from "@/auth"
import { auth } from "@/auth"
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code"
import { redirect } from "next/navigation"

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