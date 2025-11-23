import Project from "../components/project"
import Script from "next/script";

const state = {
    version: 10,
    randomSeed: "3ff2f425b09c2bb2b",
    graph: {
        viewport: {
            xmin: -10,
            ymin: -10,
            xmax: 10,
            ymax: 10
        }
    },
    expressions: {
        list: [
            { id: "1", type: "expression", latex: "y=x^2" },
            { id: "2", type: "expression", latex: "y=\\sin(x)" }
        ]
    }
};

export default function Home() {
    return (
        <div className="bg-gray-200 m-6">
            <Script
                src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3"
                strategy="afterInteractive"
            />
            <div className="grid grid-cols-4 gap-2">
                <Project state={state}></Project>
                <Project state={state}></Project>
                <Project state={state}></Project>
                <Project state={state}></Project>
                <Project state={state}></Project>
                <Project state={state}></Project>
            </div>
        </div>
    );
}