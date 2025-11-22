"use client";

import Script from "next/script";
import Form from "next/form";
import { useRef } from "react";

declare global {
    interface Window {
        Desmos: any;
    }
}

export default function Home() {
    const calcRef = useRef(null);
    const formRef = useRef(null);
    const onScriptLoad = () => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current);
        }
    };

    const handleSubmit = (formData: FormData) => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current);
            const state = JSON.stringify(calculator.getState());
            const title = formData.get("title");
            const author = formData.get("author");
            const dataToSend = [
                {"title": title},
                {"author": author},
                {"state": state}
            ];
            console.log(dataToSend);
        }

    }

    return (
        <div className="overflow-hidden">
            <Form action={handleSubmit}>
                <label>Graph Title</label>
                <input name="title"></input>
                <label>Graph Author</label>
                <input name="author"></input>
                <button type="submit">Save</button>
            </Form>
            <div className="align-bottom">
                <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3" strategy="afterInteractive" onLoad={onScriptLoad} />
                <div id="calculator" ref={calcRef} className="w-screen h-screen"></div>
            </div>
        </div>
    );
}
