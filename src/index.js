import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";
import CustomInspectorControls from "./components/admin/InspectorControls";
import CustomCodeEditor from "./components/shared/CustomCodeEditor";

wp.blocks.registerBlockType("makeupnamespace/make-up-block-name", {
  title: "Fully Fledged Code Editor",
  icon: "editor-code",
  category: "common",
  attributes: {
    template: { type: "string", default: "react" },
    files: {
      type: "object",
      default: {
        "/App.js": {
          code: `export default function App() {
return (
<div> Hello World </div>
)
}`,
          active: true,
        },
        "/style.css": { code: `body { color: blue; }`, active: false },
      },
    },
    showPreview: { type: "boolean", default: true },
    showCode: { type: "boolean", default: true },
  },
  edit: EditComponent,
  save: function () {
    return null;
  },
});

function EditComponent(props) {
  return (
    <div className="my-unique-plugin-wrapper-class">
      <CustomInspectorControls props={props} />
      <SandpackProvider
        template={props.attributes.template}
        theme={nightOwl}
        files={props.attributes.files}
      >
        <SandpackLayout>
          {props.attributes.showCode && (
            <CustomCodeEditor
              setAttributes={props.setAttributes}
              definedFiles={props.attributes.files}
            />
          )}

          {props.attributes.showPreview && <SandpackPreview />}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
