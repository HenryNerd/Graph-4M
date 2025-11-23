import db from "@/lib/db"
import Viewer from "@/components/viewer";
import Navbar from "@/components/navbar";
import { auth } from "@/auth"
import { redirect } from "next/navigation";

export default async function Post({
    params,
}: {
    params: Promise<{ post_id: string }>
}) {
    const session = await auth();
    console.log(session)
    const username = session?.user?.name || "Guest"
    
    const { post_id } = await params
    const row = db.prepare("SELECT * FROM posts WHERE title = ?").get(post_id)
    
    if (row == undefined) {
        redirect("/");
    }
    
    return (
        <div>
            <Navbar username={username}></Navbar>
            <Viewer state={row.content}></Viewer>
        </div>
    )
}