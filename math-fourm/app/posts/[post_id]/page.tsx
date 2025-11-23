import db from "@/lib/db"
import Viewer from "@/components/viewer";
import Navbar from "@/components/navbar";
import { auth } from "@/auth"
import { redirect } from "next/navigation";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function Post({
    params,
}: {
    params: Promise<{ post_id: string }>
}) {
    const session = await auth();
    console.log(session)
    const username = session?.user?.name || "Guest"
    const { post_id } = await params
    const row: any = db.prepare("SELECT * FROM posts WHERE title = ?").get(post_id)
    
    if (row == undefined) {
        redirect("/");
    }
    
    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar username={username}></Navbar>
            <div className="flex flex-col items-center pt-4">
                <div className="w-3/4 mb-4">
                    <Card className="bg-rose-100">
                        <CardHeader>
                            <CardTitle className="text-2xl">{row.title}</CardTitle>
                            <CardDescription className="text-md">By: @{row.author || username}</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="w-3/4">
                    <div className="h-[600px] flex flex-col">
                        <div className="flex-1 overflow-auto bg-white rounded-lg">
                            <Viewer state={row.content}></Viewer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}