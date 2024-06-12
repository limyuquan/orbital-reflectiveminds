import React, { useState } from "react";

const GoalSetting = (props) => {
    
  const [templateContent, setTemplateContent] = useState(
    `Setting your goals\n
Goal statement:\n
Because...
\n
Steps toward achieving them:\n
Challenges:\n
How I'll overcome them:...\n
`
);

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
    props.handleContentChange(templateContent);
  };

  return (
    <form>
      <textarea
        placeholder="What do you want to achieve?"
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

export default GoalSetting;