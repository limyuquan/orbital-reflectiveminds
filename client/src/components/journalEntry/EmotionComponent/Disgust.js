import React from "react";


const Disgust = ({ generateFeelings }) => {
    
    const disgustFeelings = [
        "Disgust",
        "Revulsion",
        "Repulsion",
        "Loathing",
        "Abhorrence",
        "Aversion",
        "Repugnance",
        "Contempt",
        "Hate",
        "Nausea",
        "Detestation",
        "Sickened",
        "Repelled",
        "Horrified",
        "Dislike",
        "Despise",
        "Disapproving",
        "Offensive",
        "Abomination",
        "Distaste",
        "Revolting",
        "Repellent",
        "Nasty",
        "Unpleasant",
        "Vile",
        "Repulsive",
        "Odious",
        "Abhorrent",
        "Sickening",
        "Objectionable",
        "Aberrant",
        "Dreadful",
        "Horrifying",
        "Icky",
        "Yucky",
        "Gross",
        "Awful",
        "Yuck",
        "Gag",
        "Disturbing",
        "Loathe",
        "Putrid",
        "Foul",
        "Rotten",
        "Stinky",
        "Stenchful",
        "Disliking",
        "Abominable",
        "Contemptible",
        "Antipathy",
        "Rancid",
        "Rank",
        "Sordid",
        "Stench"
    ];
    
    
    return (
        <>
            {generateFeelings(disgustFeelings)}
        </>
    )
}

export default Disgust;