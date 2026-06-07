import { useContext, useState, useRef, useEffect } from "react";

import { EditorContext } from "../../context/EditorContext";

import TabBar from "./TabBar";
import Terminal from "./Terminal";

import Home from "../../pages/Home";
import About from "../../pages/About";
import Experience from "../../pages/Experience";
import Projects from "../../pages/Projects";
import Skills from "../../pages/Skills";
import Achievements from "../../pages/Achievements";
import Contact from "../../pages/Contact";
import { portfolioData } from "../../data/portfolioData";

const codeSamples = {
  "Home.tsx": `function Home() {\n  return (\n    <div className=\"p-10\">\n      <div className=\"text-6xl font-bold\">Ajay Kumar</div>\n    </div>\n  )\n}\n`,
  "About.tsx": `// About.tsx\nconst developer = {\n  name: \"Ajay Kumar\",\n  role: \"Backend Engineer\"\n}`,
  "Experience.tsx": `// Experience.tsx\nconst experiences = [\n  { company: \"Pragati Prakashan\", role: \"Software Developer\" }\n]`,
  "Projects.tsx": `// Projects.tsx\n// list of projects with tech and descriptions`,
  "Skills.tsx": `// Skills.tsx\n// Skills organized by category`,
  "Achievements.tsx": `// Achievements.tsx\n// Achievements array`,
  "Contact.tsx": `// Contact.tsx\n// Contact form implementation`,
  "portfolioData.js": JSON.stringify(portfolioData, null, 2),
};

// Load raw page and data source files (Vite) so left pane shows real file content
const pageSourcesGlob = import.meta.glob('../../pages/*', { as: 'raw' });
const dataSourcesGlob = import.meta.glob('../../data/*', { as: 'raw' });

function Editor() {
  const { activeFile } = useContext(EditorContext);
  const [bottomTab, setBottomTab] = useState("TERMINAL");
  const [bottomHeight, setBottomHeight] = useState(176);
  const startY = useRef(0);
  const startH = useRef(0);
  const [mobileMode, setMobileMode] = useState('preview'); // 'preview' | 'code'
  const [bottomCollapsed, setBottomCollapsed] = useState(false);
  const [rawFiles, setRawFiles] = useState({});
  const [codeWidth, setCodeWidth] = useState(560);
  const codeStartX = useRef(0);
  const codeStartW = useRef(0);

  // load raw files once
  useEffect(() => {
    let mounted = true;

    async function loadAll() {
      const entries = await Promise.all(
        Object.entries(pageSourcesGlob).map(async ([path, loader]) => {
          const content = await loader();
          const name = path.split('/').pop().replace(/\.(jsx|js|tsx|ts)$/, '');
          return [name, content];
        })
      );

      const dataEntries = await Promise.all(
        Object.entries(dataSourcesGlob).map(async ([path, loader]) => {
          const content = await loader();
          const name = path.split('/').pop().replace(/\.(jsx|js|tsx|ts)$/, '');
          return [name, content];
        })
      );

      if (!mounted) return;
      const map = Object.fromEntries([...entries, ...dataEntries]);
      setRawFiles(map);
    }

    loadAll();
    return () => { mounted = false };
  }, []);

  function onBottomMouseDown(e) {
    e.preventDefault();
    startY.current = e.clientY;
    startH.current = bottomHeight;

    function onMove(ev) {
      const dy = startY.current - ev.clientY;
      const newH = Math.max(80, Math.min(480, startH.current + dy));
      setBottomHeight(newH);
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function onCodeMouseDown(e) {
    e.preventDefault();
    codeStartX.current = e.clientX;
    codeStartW.current = codeWidth;

    function onMove(ev) {
      const dx = ev.clientX - codeStartX.current;
      // limit so preview pane remains at least 200px
      const maxW = Math.max(300, window.innerWidth - 300);
      const newW = Math.max(160, Math.min(maxW, codeStartW.current + dx));
      setCodeWidth(newW);
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  // Close bottom panel on very small screens initially
  useEffect(() => {
    function onResize() {
      if (window.innerWidth < 768) {
        setBottomCollapsed(true);
      } else {
        setBottomCollapsed(false);
      }
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const renderPreview = () => {
    const map = {
      "Home.tsx": Home,
      "About.tsx": About,
      "Experience.tsx": Experience,
      "Projects.tsx": Projects,
      "Skills.tsx": Skills,
      "Achievements.tsx": Achievements,
      "Contact.tsx": Contact,
    };

    const Comp = map[activeFile] || Home;
    return (
      <>
        <Comp />

        {/* debug overlay to help diagnose production render issues */}
        <div style={{ position: 'fixed', right: 12, top: 72, zIndex: 60 }}>
          <div className="text-xs text-gray-400 bg-black/60 p-2 rounded">
            <div>activeFile: {String(activeFile)}</div>
            <div>Comp type: {Comp ? typeof Comp : 'undefined'}</div>
          </div>
        </div>
      </>
    );
  };

  const basename = activeFile ? activeFile.split('.')[0] : '';
  const raw = rawFiles[basename] || codeSamples[activeFile] || `// ${activeFile} \n// source preview not available`;
  const code = (typeof raw === 'string') ? raw : (raw && raw.default ? raw.default : JSON.stringify(raw, null, 2));

  function JSONView({ data }) {
    if (typeof data !== 'object' || data === null) return <pre>{String(data)}</pre>;

    return (
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(data).map(([k, v]) => (
          <div key={k} className="border border-gray-700 rounded p-4">
            <div className="text-sm text-blue-300 font-semibold mb-2">{k}</div>
            <div className="text-sm text-gray-300">
              {Array.isArray(v) ? (
                <ul className="list-disc list-inside">
                  {v.map((item, i) => (
                    <li key={i}>{String(item)}</li>
                  ))}
                </ul>
              ) : typeof v === 'object' && v !== null ? (
                <pre className="whitespace-pre-wrap">{JSON.stringify(v, null, 2)}</pre>
              ) : (
                <div>{String(v)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e]">
      <TabBar />

      <div className="flex-1 flex overflow-hidden">
        <div style={{ width: codeWidth }} className="min-h-full overflow-auto bg-[#0f1115] p-4 font-mono text-sm text-gray-300">
            <div className="bg-[#0b0c0e] rounded-lg p-4 shadow-inner min-h-full">
            <pre className="whitespace-pre-wrap">{String(code)}</pre>
          </div>
        </div>

        {/* vertical resizer */}
        <div
          onMouseDown={onCodeMouseDown}
          className="z-10 cursor-col-resize hover:bg-gray-600"
          style={{ width: 8, background: 'transparent' }}
          aria-hidden
        />

        <div className="flex-1 min-h-full overflow-auto bg-[#151515] p-4">
          <div className="bg-[#111217] rounded-lg p-4">
            {activeFile === 'portfolioData.js' ? (
              <JSONView data={portfolioData} />
            ) : (
              renderPreview()
            )}
          </div>
        </div>
      </div>

      <div style={{ height: bottomCollapsed ? 36 : bottomHeight }} className="border-t border-gray-800 bg-[#111113] text-gray-300">
        <div
          onMouseDown={onBottomMouseDown}
          className="h-1 cursor-row-resize bg-transparent hover:bg-gray-600"
          title="Drag to resize bottom panel"
        />
        <div className="flex items-center gap-6 px-4 py-2 border-b border-gray-800">
          {["PROBLEMS", "TERMINAL", "CONTACT", "CHATBOT"].map((t) => (
            <div
              key={t}
              onClick={() => setBottomTab(t)}
              className={`cursor-pointer px-3 py-1 rounded ${bottomTab === t ? 'bg-[#222228]' : ''}`}
            >
              {t}
            </div>
          ))}

          <div className="ml-auto">
            <button onClick={() => setBottomCollapsed((s) => !s)} className="px-3 py-1 rounded bg-gray-700">{bottomCollapsed ? '▲' : '▼'}</button>
          </div>
        </div>

        <div className="h-full p-4 overflow-auto">
          {bottomTab === 'TERMINAL' && <Terminal />}

          {bottomTab === 'CONTACT' && (
            <div className="p-2">
              <Contact />
            </div>
          )}

          {bottomTab === 'PROBLEMS' && (
            <div className="text-sm text-gray-400">No problems detected.</div>
          )}

          {bottomTab === 'CHATBOT' && (
            <div className="text-sm text-gray-400">Chatbot coming soon.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;