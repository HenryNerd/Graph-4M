import db from "@/lib/db"
import Viewer from "@/components/viewer";

import { redirect } from "next/navigation";

const state = {
    version: 10,
    randomSeed: "3ff2f425b09c2bb2b",
    graph: {
        viewport: {
            xmin: -10,
            ymin: -10,
            xmax: 10,
            ymax: 10
        }
    },
    expressions: {
        list: [
            { id: "1", type: "expression", latex: "y=x^2" },
            { id: "2", type: "expression", latex: "y=\\sin(x)" }
        ]
    }
};

export default async function Post({
    params,
}: { 
    params: Promise<{post_id: string}>
}) {
    const { post_id } = await params
    const row = db.prepare("SELECT * FROM posts WHERE title = ?").get(post_id)

    if (row == undefined) {
        redirect("/");
    }

    return (
        <div>
            <Viewer state={row.content}></Viewer>
        </div>
    )
}