import React from "react";

function CopyCodeButton({ activeFile, files }) {
  const copyCode = () => {
    const code = files[activeFile].code;
    navigator.clipboard.writeText(code);
  };
  const [pressing, setPressing] = React.useState(false);
  const handlePress = () => {
    setPressing(true);
  };

  const handleRelease = () => {
    setPressing(false);
  };
  return (
    <button
      onClick={copyCode}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-0 left-0 ${
        pressing ? "scale-95" : "scale-100"
      }`}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
    >
      Copy Code
    </button>
  );
}

export default CopyCodeButton;
