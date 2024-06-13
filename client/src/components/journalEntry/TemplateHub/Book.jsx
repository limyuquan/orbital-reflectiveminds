import React, { useState } from "react";

const Book = (props) => {
    
  const [templateContent, setTemplateContent] = useState(
    `Book Review\n
What's the plot?\n
\n
Main characters and their roles:...\n
\n
Any notable quotes or passages?\n
\n
How did the book make me feel?\n
\n
Final reflections on the book\n
`
);

  const handleTemplateContentChange = (e) => {
    setTemplateContent(e.target.value);
    props.handleContentChange(templateContent);
  };

  return (
    <form>
      <textarea
        placeholder="What did you read!"
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

export default Book;