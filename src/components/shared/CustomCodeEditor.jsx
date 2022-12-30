import { SandpackCodeEditor, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect } from "react";

const CustomCodeEditor = ({
  setAttributes,
  definedFiles,
  isFrontend,
  setActiveFile,
  readOnly
}) => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  useEffect(() => {
    if (isFrontend) return;
    let newFiles = {};
    Object.keys(definedFiles).forEach((key) => {
      newFiles = {
        ...newFiles,
        [key]: {
          code: definedFiles[key].code,
          active: key === activeFile,
        },
      };

      setAttributes({ files: newFiles });
    });

    setAttributes({
      files: {
        ...newFiles,
        [activeFile]: { ...newFiles[activeFile], code: files[activeFile].code },
      },
    });
  }, [files, activeFile]);

  useEffect(() => {
    if (!isFrontend) return;
    setActiveFile(activeFile);
  }, [files, activeFile]);
  return (
    <SandpackCodeEditor showTabs showLineNumbers showInlineErrors  readOnly={readOnly}/>
  );
};

export default CustomCodeEditor;
