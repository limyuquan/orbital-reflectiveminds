import React from "react";
import { SiOpenai } from "react-icons/si";


const OpenAI = () => {

    const useOpenAI = (event) => {
        event.preventDefault();
        console.log('Suggest a Journal Topic');

        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(`${apiUrl}/api/entry/open-ai`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: "Suggest a Journal Topic" //JSON.stringify(journalEntry)
        }).then((response) => response.json())
            .then(data => alert("Topic:  ", data.status))
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <button className="openai-button" onClick={useOpenAI}>
            <SiOpenai size={30} />
        </button>
    )
}

export default OpenAI;