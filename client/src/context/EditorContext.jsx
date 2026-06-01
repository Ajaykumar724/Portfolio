import { createContext, useState } from "react";

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [activeFile, setActiveFile] = useState("Home.tsx");

  const [openedFiles, setOpenedFiles] = useState([
    "Home.tsx"
  ]);

  const openFile = (file) => {
    if (!openedFiles.includes(file)) {
      setOpenedFiles((prev) => [...prev, file]);
    }

    setActiveFile(file);
  };

  const closeFile = (file) => {
    const filtered = openedFiles.filter(
      (f) => f !== file
    );

    setOpenedFiles(filtered);

    if (activeFile === file && filtered.length > 0) {
      setActiveFile(filtered[0]);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        activeFile,
        openFile,
        closeFile,
        openedFiles,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};