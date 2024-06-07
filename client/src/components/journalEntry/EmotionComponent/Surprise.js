import React from "react";


const Surpise = ({ generateFeelings }) => {
    
    const surpriseFeelings = [
        "Surprise", "Shock", "Amazement", "Astonishment", "Wonder", "Dismay", "Stun", "Startle", "Bewilderment", 
        "Confusion", "Unexpected", "Astoundment", "Marvel", "Disbelief", "Jolt", "Stupefaction", "Wondrous", 
        "Blow", "Unforeseen", "Fascination", "Unpredictable", "Stupefy", "Wonderment", "Awe", "Stagger", 
        "Stupefied", "Staggered", "Flabbergast", "Bolt", "Impress", "Wowed", "Incredulity", "Thrill", 
        "Astonished", "Stupefying", "Boggle", "Stupefy", "Unexpectedly", "Startling", "Appalled", "Wham", 
        "Nonplussed", "Eye-opener", "Impressed", "Overwhelm", "Blow one's mind", "Eureka", "Stunned", 
        "Disconcert", "Enthrall", "Stupefaction", "Thrilled", "Startlingly", "Enchanted", "Impressively", 
        "Astonishing", "Nonplus", "Thrilling", "Staggering", "Wonderstruck", "Eye-popping", "Unanticipated", 
        "Discombobulate", "Dazzled", "Stupefyingly", "Wonderfully", "Amazed", "Unforeseeable", "Astonishingly", 
        "Incredible", "Flabbergasted", "Unbelievable", "Disbelief", "Astonish", "Unbelievably", "Flummox", 
        "Unbelievably", "Stupefyingly", "Astounding", "Overwhelmed", "Astound", "Astounded", "Dumbfound", 
        "Overwhelming", "Dumbfounded", "Unbelievably", "Unanticipatedly", "Bewildered", "Dumbfound", 
        "Mind-blowing", "Startle", "Bewildering", "Baffled", "Mind-boggling", "Wondrous", "Bewilder", 
        "Bewilderingly", "Staggeringly", "Blow one's mind", "Astoundingly", "Stunning", "Stunningly", 
        "Unforeseeably"
    ];
    
    
    return (
        <>
            {generateFeelings(surpriseFeelings)}
        </>
    )
}

export default Surpise;