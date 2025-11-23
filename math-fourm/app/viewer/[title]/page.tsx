"use client";

import Script from "next/script";
import React, { useRef } from "react";

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function Viewer({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    console.log(resolvedParams);

    const calcRef = useRef(null);
    const onScriptLoad = () => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current, {expressions: false});
        }
    };

    return (
        <div className="overflow-hidden">
            <div className="align-bottom">
                <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3" strategy="afterInteractive" onLoad={onScriptLoad} />
                <div id="calculator" ref={calcRef} className="w-screen h-screen"></div>
            </div>
        </div>
    );
}
