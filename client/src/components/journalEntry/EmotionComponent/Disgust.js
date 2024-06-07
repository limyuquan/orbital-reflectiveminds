import React from "react";


const Disgust = ({ generateFeelings }) => {
    
    const disgustFeelings = [
        "Disgust", "Revulsion", "Repulsion", "Loathing", "Abhorrence", "Aversion", "Repugnance", "Contempt", 
        "Hate", "Nausea", "Detestation", "Sickened", "Repelled", "Horrified", "Dislike", "Hateful", 
        "Despise", "Disapproving", "Disapproval", "Offensive", "Offend", "Abomination", "Abominate", 
        "Distaste", "Distasteful", "Revolting", "Revoltingly", "Repellent", "Repellently", "Nasty", 
        "Unpleasant", "Unpleasantness", "Vile", "Vileness", "Repulsive", "Repulsively", "Odious", 
        "Abhorrent", "Abhorrently", "Sickening", "Sickeningly", "Objectionable", "Objectionably", 
        "Aberrant", "Dreadful", "Dreadfulness", "Horrifying", "Horrifyingly", "Hatefully", "Sick", 
        "Sickly", "Sickness", "Icky", "Yucky", "Gross", "Grossness", "Awful", "Awfulness", "Yuck", 
        "Gag", "Gagging", "Gag-inducing", "Disturbing", "Disturbingly", "Loathe", "Loathsome", 
        "Loathsomeness", "Putrid", "Putrescence", "Putrefaction", "Foul", "Foulness", "Disliking", 
        "Disliked", "Offended", "Offensive", "Offend", "Abominable", "Contemptible", "Contemptibly", 
        "Contemptuous", "Contemptuously", "Antipathy", "Antipathetic", "Antipathetically", "Rancid", 
        "Rancidity", "Rank", "Rankness", "Sordid", "Sordidness", "Rotten", "Rottenness", "Stinky", 
        "Stink", "Stench", "Stenchful"
    ];
    
    return (
        <>
            {generateFeelings(disgustFeelings)}
        </>
    )
}

export default Disgust;