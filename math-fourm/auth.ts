// export async function signup(formData: FormData) {
//     'use server';
// }

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Database from "better-sqlite3"

const db = new Database("main.db")

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {label: "Username"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials) {
        // console.log("trying to auth")
        // console.log(credentials)
        // TODO: adjust so that this works if multiple people have the same username
        // console.log(credentials.username)
        var user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(credentials.username, credentials.password)
        // if(!user) {
        //   throw new Error("Invalid Credentials")
        //   return null
        // }

        return { id: user.id, name: user.username}
        // return user
      }
    })
  ],
})