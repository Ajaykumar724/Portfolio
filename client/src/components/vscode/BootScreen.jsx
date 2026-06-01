import { useEffect, useState } from "react";

function BootScreen({ onFinish }) {
  const [logs, setLogs] = useState([]);

  const messages = [
    "Initializing AjayOS...",
    "Loading Extensions...",
    "Loading Projects...",
    "Connecting Database...",
    "Starting FastAPI Services...",
    "Portfolio Ready ✓",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setLogs((prev) => [...prev, messages[index]]);
      index++;

      if (index === messages.length) {
        clearInterval(interval);

        setTimeout(() => {
          onFinish();
        }, 1000);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-black text-green-400 p-8 font-mono">
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  );
}

export default BootScreen;