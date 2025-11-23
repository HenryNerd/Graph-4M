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
        const user: any = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(credentials.username, credentials.password)
        
        if(user === undefined) {
          throw new Error("InvalidLogin")
        }
        
        console.log("gotpast")
        return { id: String(user.id), name: user.username }
      }
    })
  ],
})