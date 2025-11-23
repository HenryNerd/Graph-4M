import Project from "../components/project"
import Navbar from "@/components/navbar";
import db from "@/lib/db"

export default function Home() {
  var states = []
  var authors = []
  var titles = []
  
  for (let i = 0; i < 16; i++) {
    const row = db.prepare("SELECT * FROM posts ORDER BY RANDOM() LIMIT 1").get()
    if (row && row.content) {
      states[i] = row.content
      authors[i] = row.author
      titles[i] = row.title
    } else {
      i--
    }
  }
  
  // Return statement AFTER the loop completes
  return (
    <div className="bg-gray-200">
      <Navbar></Navbar>
      <div className="flex justify-center bg-gray-200">
        <div className="bg-gray-200 items-center">
          <div className="grid grid-cols-4 gap-6 bg-gray-200">
            <Project state={states[0]} user={authors[0]} projectName={titles[0]}></Project>
            <Project state={states[1]} user={authors[1]} projectName={titles[1]}></Project>
            <Project state={states[2]} user={authors[2]} projectName={titles[2]}></Project>
            <Project state={states[3]} user={authors[3]} projectName={titles[3]}></Project>
            <Project state={states[4]} user={authors[4]} projectName={titles[4]}></Project>
            <Project state={states[5]} user={authors[5]} projectName={titles[5]}></Project>
            <Project state={states[6]} user={authors[6]} projectName={titles[6]}></Project>
            <Project state={states[7]} user={authors[7]} projectName={titles[7]}></Project>
            <Project state={states[8]} user={authors[8]} projectName={titles[8]}></Project>
            <Project state={states[9]} user={authors[9]} projectName={titles[9]}></Project>
            <Project state={states[10]} user={authors[10]} projectName={titles[10]}></Project>
            <Project state={states[11]} user={authors[11]} projectName={titles[11]}></Project>
            <Project state={states[12]} user={authors[12]} projectName={titles[12]}></Project>
            <Project state={states[13]} user={authors[13]} projectName={titles[13]}></Project>
            <Project state={states[14]} user={authors[14]} projectName={titles[14]}></Project>
            <Project state={states[15]} user={authors[15]} projectName={titles[15]}></Project>
          </div>
        </div>
      </div>
    </div>
  );
}