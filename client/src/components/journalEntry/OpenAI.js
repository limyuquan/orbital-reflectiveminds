import React, { useState } from "react";
import { SiOpenai } from "react-icons/si";
import { AiOutlineLoading } from "react-icons/ai";


const OpenAI = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const useOpenAI = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(`${apiUrl}/api/entry/open-ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "Suggest a Journal Topic" //JSON.stringify(journalEntry)
        }).then((response) => response.json())
            .then(data => {
                props.setIsPrompt(true)
                props.setOpenAIPrompt(data.status)
            }
            )
            .catch((error) => {
                console.error('Error:', error);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div>
        {isLoading ? (
            <div className="loader-button">
                <AiOutlineLoading size={28} />
            </div>
        ) : (
            <button className="openai-button" onClick={useOpenAI}>
                <SiOpenai size={30} />
            </button>
        )}
    </div>
    )
}

export default OpenAI;