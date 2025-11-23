import Project from "../components/project"
import Script from "next/script";
import Navbar from "@/components/navbar";
import db from "@/lib/db"

export default function Home() {
  var states = [{}]
  var authors = []
  for (let i = 0; i < 16; i++) {
    const row = db.prepare("SELECT * FROM posts ORDER BY RANDOM() LIMIT 1").get()
    if (row && row.content) {
      states[i] = row.content
      authors[i] = row.author
    } else {
      i--
    }
  }

  return (
    <div className="bg-gray-200">
      <Navbar></Navbar>
      <div className="flex justify-center bg-gray-200">
        <div className="bg-gray-200 items-center">
          <Script
            src="https://www.desmos.com/api/v1.11/calculator.js?apiKey=c1a0cb85f3d54439ac59648737fd0bb3"
            strategy="afterInteractive"
          />
          <div className="grid grid-cols-4 gap-6 bg-gray-200">
            <Project state={states[0]} user={authors[0]} projectName="Hello World"></Project>
            <Project state={states[1]} user={authors[1]} projectName="Hello World"></Project>
            <Project state={states[2]} user={authors[2]} projectName="Hello World"></Project>
            <Project state={states[3]} user={authors[3]} projectName="Hello World"></Project>
            <Project state={states[4]} user={authors[4]} projectName="Hello World"></Project>
            <Project state={states[5]} user={authors[5]} projectName="Hello World"></Project>
            <Project state={states[6]} user={authors[6]} projectName="Hello World"></Project>
            <Project state={states[7]} user={authors[7]} projectName="Hello World"></Project>
            <Project state={states[8]} user={authors[8]} projectName="Hello World"></Project>
            <Project state={states[9]} user={authors[9]} projectName="Hello World"></Project>
            <Project state={states[10]} user={authors[10]} projectName="Hello World"></Project>
            <Project state={states[11]} user={authors[11]} projectName="Hello World"></Project>
            <Project state={states[12]} user={authors[12]} projectName="Hello World"></Project>
            <Project state={states[13]} user={authors[13]} projectName="Hello World"></Project>
            <Project state={states[14]} user={authors[14]} projectName="Hello World"></Project>
            <Project state={states[15]} user={authors[15]} projectName="Hello World"></Project>
          </div>
        </div>
      </div>
    </div>
  );
}