import React, { useState } from "react";
import './EmotionMenu.css';

import Happy from "./Happy";
import Sad from "./Sad";
import Angry from "./Angry";
import Fear from "./Fear";
import Disgust from "./Disgust";
import Surpise from "./Surprise";


const EmotionMenu = props => {

    const [dropdown, setDropdown] = useState(null);

    const toggleDropdown = (event, currentDropdown) => {
        event.preventDefault();
        setDropdown(currentDropdown === dropdown ? null : currentDropdown);
    };

    const filterFunction = event => {
        const input = event.target.value.toUpperCase();
        const choices = document.getElementsByClassName("container-content");
        for (const element of choices) {
            const txtValue = element.textContent.toUpperCase();
            if (txtValue.indexOf(input) > -1) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        }
    }

    const enterFunction = event => {
        const input = event.target.value;
        if (event.key == 'Enter') {
            props.handleEmotionChange(input)
        }
    }

    const generateFeelings = feelings => {
        return feelings.map((feeling, index) =>
            <div className="container-content">
                <button className="content" onClick={event => {
                    event.preventDefault();
                    props.handleEmotionChange(feeling);
                    props.showEmotionMenu();
                }}>{feeling}</button></div>
        )
    }

    return (
        <div class="emotion-menu-container">
            
            <div class="grid-container">

                <button onClick={event => toggleDropdown(event, 'happy')} class="grid-item">Happy</button>
                {dropdown === 'happy' && (<div class="dropdown-content happy">
                    <input type="text" placeholder="Search...." id="myInput"
                        onChange={event => filterFunction(event)}
                        onKeyDown={event => enterFunction(event)} />
                    <div class="vertical-list"><Happy generateFeelings={generateFeelings} /></div>
                </div>)}



                <button onClick={event => toggleDropdown(event, 'sad')} class="grid-item">Sad</button>
                {dropdown == 'sad' && (<div class="dropdown-content sad">
                    <input type="text" placeholder="Search...." id="myInput"
                        onChange={event => filterFunction(event)}
                        onKeyDown={event => enterFunction(event)} />
                    <div class="vertical-list"><Sad generateFeelings={generateFeelings} /> </div>
                </div>)}



                <button onClick={event => toggleDropdown(event, 'angry')} class="grid-item">Angry</button>
                {dropdown == 'angry' && (<div class="dropdown-content angry">
                    <input type="text" placeholder="Search...." id="myInput"
                        onChange={event => filterFunction(event)}
                        onKeyDown={event => enterFunction(event)} />
                    <div class="vertical-list"><Angry generateFeelings={generateFeelings} /> </div>
                </div>)}



                <button onClick={event => toggleDropdown(event, 'fear')} class="grid-item">Fear</button>
                {dropdown == 'fear' && (<div class="dropdown-content fear">
                    <input type="text" placeholder="Search...." id="myInput"
                        onChange={event => filterFunction(event)}
                        onKeyDown={event => enterFunction(event)} />
                    <div class="vertical-list"><Fear generateFeelings={generateFeelings} /></div>
                </div>)}



                <button onClick={event => toggleDropdown(event, 'disgust')} class="grid-item">Disgust</button>
                {dropdown == 'disgust' && (<div class="dropdown-content disgust">
                    <input type="text" placeholder="Search...." id="myInput"
                        onChange={event => filterFunction(event)}
                        onKeyDown={event => enterFunction(event)} />
                    <div class="vertical-list"><Disgust generateFeelings={generateFeelings} /></div>
                </div>)}



                <button onClick={event => toggleDropdown(event, 'surprise')} class="grid-item">Surpise</button>
                {dropdown == 'surprise' && (<div class="dropdown-content surprise">
                    <input type="text" placeholder="Search...." id="myInput"
                        onChange={event => filterFunction(event)}
                        onKeyDown={event => enterFunction(event)} />
                    <div class="vertical-list"><Surpise generateFeelings={generateFeelings} /></div>
                </div>)}

            </div>
        </div>
    )


}

export default EmotionMenu;