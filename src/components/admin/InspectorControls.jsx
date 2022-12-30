import { InspectorControls } from "@wordpress/block-editor";
import { SelectControl, CheckboxControl } from "@wordpress/components";

function CustomInspectorControls({ props }) {
  return (
    <InspectorControls>
      <SelectControl
        label="Template"
        value={props.attributes.template}
        options={[
          { label: "React", value: "react" },
          { label: "React Typescript", value: "react-ts" },
          { label: "Typescript", value: "vanilla-ts" },
          { label: "Javascript", value: "vanilla" },
        ]}
        onChange={(newTemplate) =>
          props.setAttributes({ template: newTemplate })
        }
        __nextHasNoMarginBottom
      />
      <CheckboxControl
        label="Show code preview"
        help="Show a code preview of the generated code"
        checked={props.attributes.showPreview}
        onChange={(newShowPreview) =>
          props.setAttributes({ showPreview: newShowPreview })
        }
      />
      <CheckboxControl
        label="Show code"
        help="Show the code"
        checked={props.attributes.showCode}
        onChange={(newCode) =>
          props.setAttributes({ showCode: newCode })
        }
      />
    </InspectorControls>
  );
}

export default CustomInspectorControls;
