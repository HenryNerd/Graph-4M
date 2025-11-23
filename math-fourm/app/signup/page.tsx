'use server'
import { create_account } from '@/app/actions/create_account'

export default async function SignupPage() {
    return (
        <form action={create_account}>
            <div>
                <label htmlFor='realname'>Name</label>
                <input id="realname" name="realname"/>
            </div>
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