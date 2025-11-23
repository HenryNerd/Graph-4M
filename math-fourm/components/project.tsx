"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import { useRef, useEffect } from "react";

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
    const calcRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<any>(null);

    useEffect(() => {
        let checkInterval: NodeJS.Timeout | null = null;

        const initCalculator = () => {
            if (window.Desmos && calcRef.current && !calculatorRef.current) {
                calculatorRef.current = window.Desmos.GraphingCalculator(calcRef.current, {
                    expressions: false,
                    zoomButtons: false,
                    settingsMenu: false,
                    lockViewport: true,
                });
                calculatorRef.current.setState(state);
            }
        };

        if (window.Desmos) {
            initCalculator();
        } else {
            checkInterval = setInterval(() => {
                if (window.Desmos) {
                    if (checkInterval) clearInterval(checkInterval);
                    initCalculator();
                }
            }, 100);
        }

        return () => {
            if (checkInterval) clearInterval(checkInterval);
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
            }
        };
    }, [state]);

    return (
        <Card className="w-[300px] h-[350px] bg-rose-100/75 hover:bg-rose-100">
            <CardContent>
                <div className="align-bottom">
                    <div ref={calcRef} className="w-[250px] h-[250px]"></div>
                </div>
                <CardTitle className="mt-4">{projectName}</CardTitle>
                <CardDescription>By: {user}</CardDescription>
            </CardContent>
        </Card>
    )
}