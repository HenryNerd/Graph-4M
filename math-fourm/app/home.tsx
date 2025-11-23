"use client";
import Project from "../components/project"
import Script from "next/script";
import { useSession } from "next-auth/react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { signOutLib } from "@/lib/signoutlib";

const stateOne = {
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

const stateTwo = {
  version: 10,
  randomSeed: "a1b2c3d4e5f67890",
  graph: {
    viewport: {
      xmin: -5,
      ymin: -5,
      xmax: 5,
      ymax: 5
    }
  },
  expressions: {
    list: [
      { id: "1", type: "expression", latex: "y=2*x+1" },
      { id: "2", type: "expression", latex: "y=cos(x)" },
      { id: "3", type: "expression", latex: "y=x^3-3*x" }
    ]
  }
};

export default function Home({ initialSession }) {
  const { data: clientSession, status } = useSession();

  const session = clientSession || initialSession;

  const router = useRouter();

    const goToExplore = () => {
    router.push("/");
  };

      const goToEditor = () => {
    router.push("/editor");
  };

  const displayName = 
    session?.user?.name || 
    (status==="loading" ? "Loading..." : "Guest");

  return (
    <div className="bg-gray-200">
<NavigationMenu className="mb-10">
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
          <h1 className="text-3xl">{displayName}</h1>
          <h2 className="text-lg font-light">@henrynerd</h2>
          <form action={signOutLib}>
            <Button className="mt-5" type="submit">Sign Out</Button>
          </form>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
      <div className="flex justify-center bg-gray-200">
        <div className="bg-gray-200 items-center">
          <Script
            src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3"
            strategy="afterInteractive"
          />
          <div className="grid grid-cols-4 gap-6 bg-gray-200">
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
            <Project state={stateOne} user="Test User" projectName="Hello World"></Project>
            <Project state={stateTwo} user="Test User" projectName="Hello World"></Project>
          </div>
        </div>
      </div>
    </div>
  );
}