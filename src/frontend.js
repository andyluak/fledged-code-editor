import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import React from "react";
import ReactDOM from "react-dom";
import CopyCodeButton from "./components/frontend/CopyCodeButton";
import CustomCodeEditor from "./components/shared/CustomCodeEditor";

document.addEventListener("DOMContentLoaded", () => {
  const divsToUpdate = document.querySelectorAll(".code-editor-attributes");

  divsToUpdate.forEach((div) => {
    const data = JSON.parse(div.querySelector("pre").innerText);
    ReactDOM.render(<OurComponent {...data} />, div);
    div.classList.remove("code-editor-attributes");
  });
});

function OurComponent(props) {
  const [activeFile, setActiveFile] = React.useState("/App.js");
  return (
    <div className="bg-amber-200 border-2 border-amber-300 p-4 my-3 rounded shadow-md">
      <SandpackProvider
        template={props.template || "react"}
        theme={nightOwl}
        files={props.files}
      >
        <SandpackLayout>
          {props.showCode !== false && (
            <CustomCodeEditor
              isFrontend
              setActiveFile={setActiveFile}
              readOnly
            />
          )}
          {props.showPreview !== false && <SandpackPreview />}
          <CopyCodeButton activeFile={activeFile} files={props.files} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
