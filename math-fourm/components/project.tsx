import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Desmos from "./projectDesmos";

type ProjectProps = {
    state: any;
};

export default function Project({ state }: ProjectProps) {
    return (
        <Card className="w-[300px] h-[350px]">
            <CardContent>
                <Desmos state={state} />
                <CardTitle className="mt-4">Project Name</CardTitle>
                <CardDescription>By: User</CardDescription>
            </CardContent>
        </Card>
    )
}
