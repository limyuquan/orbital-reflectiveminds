import React from "react";
import './Template.css';

const Template = (props) => {

    const chooseTemplate = (event, number) => {
        event.preventDefault();
        props.chooseTemplate(number);
    }

    return (
    <div id="template-button-container">
        <button id="template-button" onClick={event => chooseTemplate(event, 0)}>Simple</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 1)}>Grateful for...</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 2)}>Goals</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 3)}>Today...</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 4)}>An Event</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 5)}>I read a book</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 6)}>Travel story</button>
        <button id="template-button" onClick={event => chooseTemplate(event, 7)}>Weekend Fun</button>
    </div>
    )
}

export default Template;