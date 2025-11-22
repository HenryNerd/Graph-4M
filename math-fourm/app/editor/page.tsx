"use client";

import Script from "next/script";
import { useRef } from "react";

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function Home() {
    const calcRef = useRef(null);
    const onScriptLoad = () => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current);
            calculator.expressions = false;
            console.log(calculator.getState());
        }
    };

    return (
        <div className="overflow-hidden">
            <form>
                <label>Graph Name: </label>
                <input type="text"></input>
                <label>Graph Author: </label>
                <input type=""></input>
                <input type="submit"></input>
            </form>
            <div className="align-bottom">
                <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3" strategy="afterInteractive" onLoad={onScriptLoad} />
                <div id="calculator" ref={calcRef} className="w-screen h-screen"></div>
            </div>
        </div>
    );
}
