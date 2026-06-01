import { useState, useContext } from "react";
import { EditorContext } from "../../context/EditorContext";

const commands = {
  help: `
about
skills
projects
experience
contact
resume
ondc
leetcode
`,

  about: "Backend Engineer | FastAPI | Node.js",

  skills: "Python Java FastAPI Node.js React PostgreSQL MongoDB",

  ondc: "Built ONDC Seller Backend in Pre-Production Environment",

  leetcode: "500+ Problems Solved | Rating 1449",

  contact: "ajaykumar724785@gmail.com",
};

function Terminal() {
  const [command, setCommand] = useState("");

  const [history, setHistory] = useState([]);
  const { openFile } = useContext(EditorContext) || {};

  const executeCommand = () => {
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;

    const out = commands[cmd];

    const fileMap = {
      about: 'About.tsx',
      skills: 'Skills.tsx',
      projects: 'Projects.tsx',
      experience: 'Experience.tsx',
      contact: 'Contact.tsx',
      home: 'Home.tsx',
    };

    const entries = [`> ${command}`];

    if (out) {
      if (typeof out === "string") {
        const lines = out
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
        entries.push(...lines);
      } else {
        entries.push(String(out));
      }
    } else {
      entries.push("Command not found");
    }

    setHistory((prev) => [...prev, ...entries]);
    setCommand("");
    // open editor file if command corresponds to a page
    if (fileMap[cmd] && openFile) {
      openFile(fileMap[cmd]);
    }
  };

  return (
    <div className="h-full bg-black text-green-400 p-3 overflow-auto">
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div className="flex">
        <span>$</span>

        <input
          className="bg-transparent outline-none ml-2 flex-1"
          value={command}
          onChange={(e) =>
            setCommand(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter")
              executeCommand();
          }}
        />
      </div>
    </div>
  );
}

export default Terminal;