import React from "react";


const TemplateDefault = (props) => {
    return (
        <div>
            <textarea placeholder="What's on your mind today?" id="text" name="text" rows="10"
                        value={props.content}
                        onChange={e => props.handleContentChange(e.target.value)}
                        style={{
                            outline: "none",
                            border: "none",
                            overflow: 'auto',
                            wordWrap: 'break-word',
                            resize: 'none',
                            height: '700px',
                            width: '510px'
                        }}>
            </textarea>
        </div>
    )
}

export default TemplateDefault;