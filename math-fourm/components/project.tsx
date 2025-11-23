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
};

export default function Project({ state }: ProjectProps) {
    const calcRef = useRef<HTMLDivElement>(null);
    const calculatorRef = useRef<any>(null);

    useEffect(() => {
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
            const checkDesmos = setInterval(() => {
                if (window.Desmos) {
                    clearInterval(checkDesmos);
                    initCalculator();
                }
            }, 100);

            return () => clearInterval(checkDesmos);
        }

        return () => {
            if (calculatorRef.current) {
                calculatorRef.current.destroy();
            }
        };
    }, [state]);

    return (
        <Card className="w-[300px] h-[350px]">
            <CardContent>
                <div className="align-bottom">
                    <div ref={calcRef} className="w-[250px] h-[250px]"></div>
                </div>
                <CardTitle className="mt-4">Project Name</CardTitle>
                <CardDescription>By: User</CardDescription>
            </CardContent>
        </Card>
    )
}