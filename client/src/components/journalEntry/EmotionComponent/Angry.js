import React from "react";


const Angry = ({ generateFeelings }) => {
    
    const angryFeelings = [
        "Anger", "Rage", "Fury", "Indignation", "Irate", "Wrath", "Mad", "Outraged", "Fuming", "Temper", 
        "Enraged", "Livid", "Fuming", "Infuriated", "Irked", "Miffed", "Annoyed", "Vexed", "Provoked", 
        "Resentment", "Hostile", "Offended", "Bitterness", "Displeased", "Tantrum", "Seething", "Cross", 
        "Belligerent", "Peeved", "Riled", "Exasperated", "Irritated", "Incensed", "Disgruntled", "Spiteful", 
        "Wrathful", "Grouchy", "Pissed", "Aggravated", "Sore", "Infuriation", "Choleric", "Lividness", 
        "Rancor", "Sullen", "Enrage", "Riled", "Enragement", "Temperamental", "Fiery", "Surliness", 
        "Annoyance", "Disgruntlement", "Frustration", "Offense", "Umbrage", "Vehement", "Grumpy", "Tantrums", 
        "Fury", "Spite", "Temper", "Outrage", "Irritation", "Hostility", "Indignant", "Antagonistic", 
        "Pique", "Peevish", "Huffy", "Sullen", "Outraged", "Spitefulness", "Tetchy", "Fit of rage", 
        "Angry", "Unhappy", "Fit of temper", "Wrathfulness", "Ire", "Testy", "Fuming", "Testiness", 
        "Spiteful", "Vindictive", "Bad temper", "Irascible", "Short-tempered", "Touchy", "Ill-tempered", 
        "Anger management", "Outburst", "Irritable", "Outrageous", "Galled", "Hostility", "Snappish", 
        "Perturbed", "Choleric", "Tantrum", "Upset"
    ];
    
    return (
        <>
            {generateFeelings(angryFeelings)}
        </>
    )
}

export default Angry;