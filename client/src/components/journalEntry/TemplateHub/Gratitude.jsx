import React, { useState } from "react";

const GratitudeForm = (props) => {
    
  const [templateContent, setTemplateContent] = useState(
    `Daily Gratitude Practice\n
I am grateful for:\n
Because...
\n
I am grateful for:\n
Because...
\n
I am grateful for:\n
Because...`
);

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
    props.handleContentChange(templateContent);
  };

  return (
    <form>
      <textarea
        placeholder="What's on your mind today?"
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

export default GratitudeForm;
