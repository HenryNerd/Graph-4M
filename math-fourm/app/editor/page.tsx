"use client";
import { useRef, useEffect } from "react";
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
    const calcRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<any>(null);
    const stateRef = useRef<any>({});

    useEffect(() => {
        const initCalculator = () => {
            if (window.Desmos && calcRef.current && !calculatorRef.current) {
                try {
                    calculatorRef.current = window.Desmos.GraphingCalculator(calcRef.current);
                    calculatorRef.current.observeEvent('change', () => {
                        stateRef.current = calculatorRef.current.getState();
                    });
                } catch (error) {
                    console.error("Error initializing Desmos:", error);
                }
            }
        };

        const timeoutId = setTimeout(() => {
            if (window.Desmos) {
                initCalculator();
            } else {
                // Fallback: wait for Desmos to load
                const checkInterval = setInterval(() => {
                    if (window.Desmos) {
                        clearInterval(checkInterval);
                        initCalculator();
                    }
                }, 50);
                
                setTimeout(() => clearInterval(checkInterval), 5000);
            }
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (calculatorRef.current) {
                try {
                    calculatorRef.current.destroy();
                } catch (error) {
                    console.error("Error destroying calculator:", error);
                }
                calculatorRef.current = null;
            }
        };
    }, []);

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title");
        const author = formData.get("author");
        const description = formData.get("description");
        
        const dataToSend = {
            "title": title,
            "author": author,
            "description": description,
            "state": JSON.stringify(stateRef.current)
        }
        
        submit_post(dataToSend);
    }

    return (
        <div className="overflow-hidden bg-gray-200">
            <Navbar />
            <div className="flex flex-1 h-[700px]">
                <div className="flex-1 h-full m-5">
                    <div ref={calcRef} className="w-full h-[680px]" style={{ minHeight: '680px' }}></div>
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