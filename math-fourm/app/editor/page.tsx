"use client";

import Script from "next/script";
import Form from "next/form";
import { useRef } from "react";
import { submit_post } from "@/app/actions/submit_post"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar";

import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function Home() {
    const calcRef = useRef(null);
    var state = {};
    const onScriptLoad = () => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current);
            calculator.observeEvent('change', () => {
                state = calculator.getState();
            })
        }
    };

    const handleSubmit = (formData: FormData) => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current, {keypad: false});
            const state = JSON.stringify(calculator.getState());
            const title = formData.get("title");
            const author = formData.get("author");
            const stateString = JSON.stringify(state);
            const dataToSend = {
                "title": title,
                "author": author,
                "state": stateString 
            }
            submit_post(dataToSend)
        }
    }

    return (
        <div className="overflow-hidden bg-gray-200">
            <Navbar />
            <div className="flex items-start bg-gray-200">
                <div className="flex-1 bg-gray-200">
                    <Script
                        src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3"
                        strategy="afterInteractive"
                        onLoad={onScriptLoad}
                    />
                </div>

            </div>
            <div className="flex flex-1 h-[700px]">
                <div className="flex-1 h-full m-5">
                    <div ref={calcRef} className="w-full h-[680px]"></div>
                </div>
                <div className="w-1/3 h-full m-5">
                    <Card className="p-4 h-[680px]">
                        <CardTitle className="text-2xl">New Project</CardTitle>
                        <form action={handleSubmit} className="justify-between">
                            <label>Graph Title</label>
                            <Input className="mb-4" name="title" required />
                            <label>Graph Author</label>
                            <Input className="mb-4" name="author" required />
                            <label>Description</label>
                            <Input className="h-[100px]" name="description" required />
                            <Button className="bg-rose-100 hover:bg-rose-200 mt-8 w-full" type="submit" variant="outline">Publish</Button>

                        </form>
                    </Card>
                </div>
            </div>

        </div>

    );
}
