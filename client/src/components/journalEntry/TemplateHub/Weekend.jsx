import React, { useState } from "react";

const Weekend = (props) => {
    
  const [templateContent, setTemplateContent] = useState(
    `It's the Weekend!\n
How do I feel as the weekend comes to a close?\n
\n
Did I accomplish any personal or professional goals this weekend?\n
\n
What am I excited about for the upcoming week?\n
`
);

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
    props.handleContentChange(templateContent);
  };

  return (
    <form>
      <textarea
        placeholder="Tell me about your weekend!"
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

export default Weekend;