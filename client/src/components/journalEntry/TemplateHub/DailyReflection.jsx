import React, { useState } from "react";

const DailyReflection = (props) => {
    
  const [templateContent, setTemplateContent] = useState(
    `Daily Day Diary
What were the highlights of my day?\n
\n
What were the lowlights...\n
\n
What could I have done differently or better?\n
\n
What am I looking forward to tomorrow?\n
`
);

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
    props.handleContentChange(templateContent);
  };

  return (
    <form>
      <textarea
        placeholder="Tell me about your day!"
        id="text"
        name="text"
        rows="10"
        value={templateContent}
        onChange={handleTemplateContentChange}
        style={{
          outline: "none",
          border: "none",
          overflow: "auto",
          wordWrap: "break-word",
          resize: "none",
          height: "700px",
          width: "510px",
        }}
      />
    </form>
  );
};

export default DailyReflection;