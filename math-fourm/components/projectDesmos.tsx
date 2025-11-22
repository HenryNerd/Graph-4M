"use client";

import Script from "next/script";
import { useRef } from "react";

declare global {
  interface Window {
    Desmos: any;
  }
}

type DesmosProps = {
  state: any;
};

export default function Desmos({state}: DesmosProps) {
  const calcRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<any>(null);

  const onScriptLoad = () => {
    if (window.Desmos && calcRef.current) {
      calculatorRef.current = new window.Desmos.GraphingCalculator(calcRef.current, {
        expressions: false,
        zoomButtons: false,
        settingsMenu: false,
        lockViewport: true,
      });

      calculatorRef.current.setState(state);
    }
  };

  return (
    <div className="align-bottom">
      <Script
        src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3"
        strategy="afterInteractive"
        onLoad={onScriptLoad}
      />
      <div id="calculator" ref={calcRef} className="w-[250px] h-[250px]"></div>
    </div>
  );
}
