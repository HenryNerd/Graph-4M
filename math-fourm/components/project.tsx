"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { useRef, useEffect, useState } from "react";

declare global {
    interface Window {
        Desmos: any;
    }
}

type ProjectProps = {
    state: any;
    user: string;
    projectName: string;
};

export default function Project({ state, user, projectName }: ProjectProps) {
    const link = "/posts/" + projectName
    const calcRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initCalculator = () => {
            if (window.Desmos && calcRef.current && !calculatorRef.current) {
                try {
                    calculatorRef.current = window.Desmos.GraphingCalculator(calcRef.current, {
                        expressions: false,
                        zoomButtons: false,
                        settingsMenu: false,
                        lockViewport: true,
                    });
                    calculatorRef.current.setState(state);
                    setIsReady(true);
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
    }, [state]);

    return (
        <Card className="w-[300px] h-[350px] bg-rose-100/75 hover:bg-rose-100">
            <CardContent>
                <div className="align-bottom">
                    <div 
                        ref={calcRef} 
                        className="w-[250px] h-[250px]"
                        style={{ minHeight: '250px' }}
                    />
                </div>
                <a href={link}><CardTitle className="mt-4">{projectName}</CardTitle></a>
                <CardDescription>By: {user}</CardDescription>
            </CardContent>
        </Card>
    )
}