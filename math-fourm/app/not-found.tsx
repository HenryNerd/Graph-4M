"use client"
import Navbar from "@/components/navbar"
import Image from 'next/image';
import localImage from '../public/404.png';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function errorPage(){
    const router = useRouter();

         const goHome = () => {
    router.push("/");
  };

return(
    <div className="text-center bg-gray-200 width-[900px]">
    <Navbar></Navbar>
    <Image className="mx-auto mb-10" src={localImage} alt="Profile" />
    <h1 className="text-8xl">404</h1>
    <h2 className="text-3xl mt-3">Page Not Found</h2>
    <Button onClick={goHome} className="w-[400px] text-xl mt-5 bg-rose-100 text-color-black hover:bg-rose-200">Return Home</Button>
    </div>
)
}