"use client";

import Script from "next/script";
import React, { useRef } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function Viewer({ state }: any) {
    const calcRef = useRef(null);
    const onScriptLoad = () => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current, { actions: false });
            calculator.setState(state);
        }
    };

    return (
        <div className="overflow-hidden">
            <div className="align-bottom">

                <div>
                    <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3" strategy="afterInteractive" onLoad={onScriptLoad} />
                    <div id="calculator" ref={calcRef} className="w-3/4 h-[700px] ml-3"></div>
                </div>
            </div>
        </div>
    );
}
