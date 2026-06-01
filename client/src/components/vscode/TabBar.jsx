import { useContext } from "react";
import { EditorContext } from "../../context/EditorContext";

function TabBar() {
  const {
    openedFiles,
    activeFile,
    openFile,
    closeFile,
  } = useContext(EditorContext);

  return (
    <div className="flex bg-[#2d2d2d]">
      {openedFiles.map((file) => (
        <div
          key={file}
          className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer
          ${
            activeFile === file
              ? "bg-[#1e1e1e]"
              : ""
          }`}
          onClick={() => openFile(file)}
        >
          {file}

          <span
            onClick={(e) => {
              e.stopPropagation();
              closeFile(file);
            }}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  );
}

export default TabBar;