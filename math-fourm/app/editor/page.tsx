"use client";

import Script from "next/script";
import Form from "next/form";
import { useRef } from "react";
import { submit_post } from "@/app/actions/submit_post"

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
        }
    };

    const handleSubmit = (formData: FormData) => {
        if (window.Desmos && calcRef.current) {
            const calculator = new window.Desmos.GraphingCalculator(calcRef.current);
            const state = JSON.stringify(calculator.getState());
            const title = formData.get("title");
            const author = formData.get("author");
            const dataToSend = {
                "title": title,
                "author": author,
                "state": state
            }
            submit_post(dataToSend)
            calculator.destroy();
        }

    }

    return (
        <div className="overflow-hidden">
            <Form action={handleSubmit}>
                <label>Graph Title: </label>
                <input name="title" required></input>
                <label>Graph Author: </label>
                <input name="author" required></input>
                <button type="submit">Save</button>
            </Form>
            <div className="align-bottom">
                <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3" strategy="afterInteractive" onLoad={onScriptLoad} />
                <div id="calculator" ref={calcRef} className="w-screen h-150"></div>
            </div>
        </div>
    );
}
