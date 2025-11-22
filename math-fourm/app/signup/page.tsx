'use server'
import { signup } from '@/app/actions/auth'

export default async function SignupPage() {
    return (
        <form action={signup}>
            <div>
                <label htmlFor='username'>Username</label>
                <input id="username" name="username"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password"/>
            </div>
            <button type="submit">Sign up!</button>
        </form>
    )
}