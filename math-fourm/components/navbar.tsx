"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { signOutLib } from "@/lib/signoutlib";

export default function Navbar({username}) {
    const router = useRouter();

    const goToExplore = () => {
        router.push("/");
    };

    const goToEditor = () => {
        router.push("/editor");
    };
    return (
        <NavigationMenu className="mb-5">
            <NavigationMenuList className="flex items-center w-full">
                <div className="flex space-x-4">
                    <NavigationMenuLink>Home</NavigationMenuLink>
                    <NavigationMenuLink onClick={goToExplore}>Explore</NavigationMenuLink>
                    <NavigationMenuLink onClick={goToEditor}>Editor</NavigationMenuLink>
                </div>
                <NavigationMenuItem className="ml-auto">
                    <NavigationMenuTrigger className="bg-gray-200">My Profile</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[300px] p-4">
                            <h1 className="text-3xl">Henry Veedahl</h1>
                            <h2 className="text-lg font-light">@{username}</h2>
                            <Button className="mt-5 bg-rose-100 text-black hover:bg-rose-200" onClick={signOutLib}>Sign Out</Button>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}