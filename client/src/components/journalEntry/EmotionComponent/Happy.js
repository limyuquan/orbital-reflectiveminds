import React from "react";


const Happy = ({ generateFeelings }) => {

    const happyFeelings = [
        "Joyful",
        "Cheerful",
        "Delighted",
        "Content",
        "Pleased",
        "Thrilled",
        "Elated",
        "Blissful",
        "Ecstatic",
        "Merry",
        "Satisfied",
        "Glad",
        "Jubilant",
        "Exultant",
        "Radiant",
        "Euphoric",
        "Overjoyed",
        "Buoyant",
        "Upbeat",
        "Gleeful",
        "Sunny",
        "Smiling",
        "Grinning",
        "Laughing",
        "Beaming",
        "Bubbly",
        "Chirpy",
        "Chipper",
        "Peppy",
        "Perky",
        "Optimistic",
        "Positive",
        "Lighthearted",
        "Carefree",
        "Contented",
        "Sanguine",
        "Halcyon",
        "Uplifted",
        "Vivacious",
        "Blithe",
        "Jaunty",
        "Zestful",
        "Ebullient",
        "In high spirits",
        "In good spirits",
        "Full of beans",
        "On cloud nine",
        "Walking on air",
        "Happy-go-lucky",
        "Over the moon",
        "On top of the world",
        "Rapturous",
        "Delirious",
        "Triumphant",
        "Cheery",
        "Mirthful",
        "Jovial",
        "Chuffed",
        "Tickled pink",
        "Joyous",
        "Pleased as punch",
        "In seventh heaven",
        "Gratified",
        "Blithesome",
        "Jocund",
        "Exhilarated",
        "Convivial",
        "Rejoicing",
        "Exulting"
    ];
    
    
    return (
        <div className="vertical-list">  
        {generateFeelings(happyFeelings)}
        </div>
    )
}

export default Happy;