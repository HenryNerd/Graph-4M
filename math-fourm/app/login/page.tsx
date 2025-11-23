import { signIn } from "@/auth"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

export default function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
        const { data: session } = useSession();
        console.log("Session Data: " + session.user)
      }}
    >
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