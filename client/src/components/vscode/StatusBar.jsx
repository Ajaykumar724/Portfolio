import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

function StatusBar() {
  const { theme, setTheme } = useTheme();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="statusbar flex items-center gap-4 px-4 text-sm text-gray-200">
      <div className="flex-1 flex items-center gap-4">
        <div>Python | FastAPI | PostgreSQL | GitHub | Main Branch</div>
      </div>

      <div className="flex-1 text-center text-gray-300">{dateStr} | {timeStr} | Meerut, India</div>

      <div className="flex gap-2">
        <button
          className={`px-2 py-1 rounded ${theme === 'vscode-dark' ? 'bg-gray-800' : 'bg-gray-700'}`}
          onClick={() => setTheme('vscode-dark')}
        >
          VSCode Dark+
        </button>

        <button
          className={`px-2 py-1 rounded ${theme === 'monokai' ? 'bg-gray-800' : 'bg-gray-700'}`}
          onClick={() => setTheme('monokai')}
        >
          Monokai
        </button>

        <button
          className={`px-2 py-1 rounded ${theme === 'github-dark' ? 'bg-gray-800' : 'bg-gray-700'}`}
          onClick={() => setTheme('github-dark')}
        >
          GitHub Dark
        </button>
      </div>
    </div>
  );
}

export default StatusBar;
