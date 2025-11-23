'use client';

import { useRef, useEffect, useState } from "react";
import { submit_post } from "@/app/actions/submit_post"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar";
import {
    Card,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

import { AlertCircleIcon} from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function EditorClient({ username, auth_status }: { username?: string | null, auth_status?: boolean | false }) {
    const router = useRouter();
    const calcRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<any>(null);
    const stateRef = useRef<any>({});

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');

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

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTitle(value);

        if (/\s/.test(value)) {
            setTitleError('Spaces are not allowed in the title');
        } else if (/[^A-Za-z0-9\-._]/.test(value)) {
            setTitleError('Only letters, numbers, hyphens, dots, and underscores are allowed');
        } else {
            setTitleError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate before submitting
        if (titleError || /\s/.test(title) || /[^A-Za-z0-9\-._]/.test(title)) {
            alert('Title contains invalid characters. Please fix the errors before submitting.');
            return;
        }

        const dataToSend = {
            "title": title,
            "author": username,
            "description": description,
            "state": JSON.stringify(stateRef.current)
        }
        if (!(username == "Guest")) {
            await submit_post(dataToSend);
            router.push("/");
        }
    }

    const goToLogin = () => {
        router.push("/login")
    }

    return (
        <div className="overflow-hidden bg-gray-200">
            <Navbar username={username} />
            <div className="flex flex-1 h-[700px]">
                <div className="flex-1 h-full m-5">
                    <div ref={calcRef} className="w-full h-[680px]" style={{ minHeight: '680px' }}></div>
                </div>
                <div className="w-1/3 h-full m-5">
                    <Card className="p-4 h-[680px]">
                        <CardTitle className="text-2xl">New Project</CardTitle>
                        <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertTitle>You Are Not Signed In</AlertTitle>
                            <AlertDescription>
                                <p>Guest acounts are not allowed to post any projects.</p>
                                <Button variant="outline" onClick={goToLogin} className="w-full p-4">Sign In</Button>
                            </AlertDescription>
                        </Alert>
                        <form onSubmit={handleSubmit} className="justify-between">
                            <label>Graph Title</label>
                            <Input
                                className="mb-4"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />
                            {titleError && (
                                <p className="text-red-500 text-sm -mt-3 mb-3">{titleError}</p>
                            )}

                            {/* <label>Graph Author</label>
              <Input 
                className="mb-4" 
                name="author" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required 
              /> */}

                            <label>Description</label>
                            <Input
                                className="h-[100px]"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                            <Button
                                className="bg-rose-100 hover:bg-rose-200 mt-8 w-full"
                                type="submit"
                                variant="outline"
                                disabled={!!titleError}
                            >
                                Publish
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}