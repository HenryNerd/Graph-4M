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
    const row = db.prepare("SELECT * FROM posts WHERE title = ?").get(post_id)

    if (row == undefined) {
        redirect("/");
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="justify-center">
            <div className="w-3/4 h-[100px] border-l ml-3 mb-4">
                <Card className="h-[100px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Project Name</CardTitle>
                        <CardDescription className="text-md">By: @user</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div className="w-4/4 h-screen">
                <div className="w-full h-[600px] flex flex-col">
                    <div className="flex-1 overflow-auto">
                        <Viewer state={row.content}></Viewer>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}