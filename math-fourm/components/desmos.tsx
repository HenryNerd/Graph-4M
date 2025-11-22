"use client";

import Script from "next/script";
import { useRef } from "react";

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function Desmos() {
    const calcRef = useRef(null);
    const onScriptLoad = () => {
        if (window.Desmos && calcRef.current) {
            new window.Desmos.GraphingCalculator(calcRef.current);
        }
    };
    return (
        <div className="align-bottom">
            <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3" strategy="afterInteractive" onLoad={onScriptLoad} />
            <div id="calculator" ref={calcRef} className="w-[600px] h-[600px]"></div>
        </div>
    )
}
