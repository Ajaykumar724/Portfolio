import React, { useState, useRef } from "react";
import ActivityBar from "./components/vscode/ActivityBar";
import Explorer from "./components/vscode/Explorer";
import Editor from "./components/vscode/Editor";
import StatusBar from "./components/vscode/StatusBar";
import StartupAnimation from "./components/vscode/StartupAnimation";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppInner() {
  const { theme } = useTheme();

  const themeClass = theme === 'vscode-dark' ? 'theme-vscode' : theme === 'monokai' ? 'theme-monokai' : 'theme-gh-dark';
  const [explorerWidth, setExplorerWidth] = useState(288);
  const [explorerCollapsed, setExplorerCollapsed] = useState(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const [showExplorerOverlay, setShowExplorerOverlay] = useState(false);

  function onMouseDown(e) {
    e.preventDefault();
    startX.current = e.clientX;
    startWidth.current = explorerWidth;

    function onMove(ev) {
      const dx = ev.clientX - startX.current;
      const newWidth = Math.max(160, Math.min(640, startWidth.current + dx));
      setExplorerWidth(newWidth);
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  return (
    <div className={`h-screen ${themeClass} text-white flex flex-col`}>
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar onToggleExplorer={() => setShowExplorerOverlay(true)} />

        <div style={{ width: explorerCollapsed ? 56 : explorerWidth }} className={`flex-shrink-0 hidden md:block ${explorerCollapsed ? 'overflow-hidden' : ''}`}>
          <Explorer collapsed={explorerCollapsed} onToggleCollapse={() => setExplorerCollapsed(s => !s)} />
        </div>

        {showExplorerOverlay && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowExplorerOverlay(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#252526] p-4">
              <div className="flex justify-end">
                <button className="text-gray-300" onClick={() => setShowExplorerOverlay(false)}>Close</button>
              </div>
              <Explorer />
            </div>
          </div>
        )}

        <div
          onMouseDown={onMouseDown}
          className="cursor-col-resize bg-transparent hover:bg-gray-600"
          style={{ width: 6 }}
          title="Drag to resize explorer"
        />

        <Editor />
      </div>

      <StatusBar />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StartupAnimation />
      <AppInner />
    </ThemeProvider>
  );
}

export default App;