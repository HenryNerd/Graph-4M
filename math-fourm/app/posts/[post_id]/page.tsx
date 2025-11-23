import db from "@/lib/db"

export default async function Post({
    params,
}: { 
    params: Promise<{post_id: number}>
}) {
    const { post_id } = await params
    const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(post_id)

    return (
        <div>
            <p>Post: {post_id}</p>
        </div>
    )
}