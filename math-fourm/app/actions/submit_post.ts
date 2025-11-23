'use server';
import Database from "better-sqlite3"

const db = new Database("main.db")
interface JsonObject {
    [title: string]:
    []
}

// TODO: add type
export async function submit_post(data: any) {
    const { title, author, state } = data
    console.log(author, title, state)
    db.prepare(
        'INSERT INTO posts (author, title, content) VALUES (?, ?, ?);'
    ).run(author, title, state)
}