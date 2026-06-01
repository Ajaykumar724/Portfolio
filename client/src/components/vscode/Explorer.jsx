import { useContext } from "react";
import { EditorContext } from "../../context/EditorContext";
import { SiTypescript, SiJavascript, SiReact } from 'react-icons/si';
import { VscFile } from 'react-icons/vsc';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai';

const files = [
  "Home.tsx",
  "About.tsx",
  "Experience.tsx",
  "Projects.tsx",
  "Skills.tsx",
  "Achievements.tsx",
  "Contact.tsx",
  "portfolioData.js",
];

function IconFor(file) {
  const ext = file.split('.').pop().toLowerCase();
  if (ext === 'ts' || ext === 'tsx') return SiTypescript;
  if (ext === 'js' || ext === 'jsx') return SiJavascript;
  if (ext === 'react') return SiReact;
  return VscFile;
}

function Explorer({ collapsed, onToggleCollapse }) {
  const { openFile } = useContext(EditorContext);

  if (collapsed) {
    return (
      <div className="bg-[#252526] h-full flex flex-col items-center py-4 gap-3">
        <button onClick={onToggleCollapse} className="text-gray-300 p-1" title="Expand Explorer">
          <AiOutlineDoubleRight size={18} />
        </button>
        {files.map((file) => {
          const Icon = IconFor(file);
          return (
            <button
              key={file}
              onClick={() => openFile(file)}
              className="p-2 text-gray-300 hover:bg-[#37373d] rounded"
              title={file}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-[#252526] h-full">
      <div className="p-3 text-sm flex items-center justify-between">
        <div>EXPLORER</div>
        <button onClick={onToggleCollapse} className="text-gray-300" title="Collapse Explorer">
          <AiOutlineDoubleLeft />
        </button>
      </div>

      {files.map((file) => {
        const Icon = IconFor(file);
        return (
          <div
            key={file}
            onClick={() => openFile(file)}
            className="px-4 py-2 cursor-pointer hover:bg-[#37373d] flex items-center gap-2"
          >
            <span className="text-gray-300"><Icon size={16} /></span>
            <span className="text-sm">{file}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Explorer;