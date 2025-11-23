'use server';
import Database from "better-sqlite3"
import { redirect } from 'next/navigation'

const db = new Database("main.db")

// TODO: CHECK FOR EXISTING USERS
export async function create_account(data: FormData) {
    const username = data.get("username");
    const realname = data.get("realname");
    const password = data.get("password");
    console.log(username)
    db.prepare(
        'INSERT INTO users (username, realname, password) VALUES (?, ?, ?);'
    ).run(username, realname, password);
    redirect('/login')
}