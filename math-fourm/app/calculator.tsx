import Script from "next/script";

export default function Calculator() {
    return (
        <div>
            <h1>Calculator</h1>
            <Script src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=5a30073ee67149b49b0fcdc634dd5f8d" strategy="lazyOnload"/>
            <div id="calculator"></div>
            <script>
                var elt = document.getElementById('calculator');
                var calculator = Desmos.GraphingCalculator(elt);
            </script>
        </div>
    );
}