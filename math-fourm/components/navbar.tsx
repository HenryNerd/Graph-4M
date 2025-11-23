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

export default function Navbar({username}: any) {
    let hidelogin = true;
    if(username == "Guest") {
        hidelogin = false
    } 
    console.log("info ", hidelogin)
    const router = useRouter();

    const goToExplore = () => {
        router.push("/");
    };

    const goToEditor = () => {
        if (username == "Guest") {
            router.push("/login");
        } else {
            router.push("/editor");
        }
    };

    const goToLogin = () => {
        router.push("/login");
    };

    const goToSignup = () => {
        router.push("/signup");
    };
    return (
        <NavigationMenu className="mb-5">
            <NavigationMenuList className="flex items-center w-full">
                <div className="flex space-x-4">
                    <NavigationMenuLink onClick={goToExplore}>Explore</NavigationMenuLink>
                    <NavigationMenuLink onClick={goToEditor}>Editor</NavigationMenuLink>
                </div>
                <NavigationMenuItem className="ml-auto">
                    <NavigationMenuTrigger className="bg-gray-200">My Profile</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid w-[300px] p-4">
                            <h1 className="text-3xl">{username}</h1>
                            <h2 className="text-lg font-light">@{username}</h2>
                            <Button hidden={!hidelogin}className="mt-5 bg-rose-100 text-black hover:bg-rose-200" onClick={signOutLib}>Sign Out</Button>
                            <Button hidden={hidelogin}className="mt-5 bg-rose-100 text-black hover:bg-rose-200" onClick={goToLogin}>Sign In</Button>
                            <hr hidden={hidelogin} className="m-3"/>
                            <Button hidden={hidelogin}className=" bg-rose-100 text-black hover:bg-rose-200" onClick={goToSignup}>Sign Up</Button>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}