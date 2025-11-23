import { auth } from "@/auth"
import EditorClient from "./editorClient";

export default async function EditorPage() {
  const session = await auth();
  const username = session?.user?.name;
  
  return <EditorClient username={username} />;
}