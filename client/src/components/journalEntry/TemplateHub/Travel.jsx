import React, { useState } from "react";

const Travel = (props) => {
    
  const [templateContent, setTemplateContent] = useState(
    `Travel & Adventure!\n
Destination:\n
Dates of Travel:\n
\n
What did you do:\n
`
);

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
    props.handleContentChange(templateContent);
  };

  return (
    <form>
      <textarea
        placeholder="Tell me about your holidays!"
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

export default Travel;