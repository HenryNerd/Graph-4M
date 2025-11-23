import { auth } from "@/auth"
import EditorClient from "./editorClient";
import db from "@/lib/db";

export default async function EditorPage() {
  const session = await auth();
  const username = session?.user?.name || "Guest";
  
  let realname = null;
  if (username !== "Guest") {
    const userRow: any = db.prepare("SELECT realname FROM users WHERE username = ?").get(username);
    realname = userRow?.realname || null;
  }
  
  return <EditorClient username={username}/>;
}