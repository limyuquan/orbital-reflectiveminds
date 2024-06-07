import React from "react";


const Fear = ({ generateFeelings }) => {
    
    const fearFeelings = [
        "Fear", "Anxiety", "Panic", "Terror", "Dread", "Fright", "Worry", "Apprehension", "Nervousness", 
        "Alarm", "Horror", "Trepidation", "Unease", "Distress", "Awe", "Phobia", "Agitation", "Consternation", 
        "Foreboding", "Scare", "Petrified", "Paranoia", "Tense", "Horrified", "Terror-stricken", "Frightened", 
        "Frightening", "Terrified", "Petrifying", "Hysteria", "Shocked", "Panic-stricken", "Panic attack", 
        "Startle", "Shivering", "Cold sweat", "Shuddering", "Quaking", "Shiver", "Shriek", "Shaky", 
        "Shudder", "Shaky", "Shivering", "Shiver", "Apprehensive", "Nervous", "Tense", "Jumpy", "Timid", 
        "Timidity", "Shy", "Shyness", "Cautious", "Uneasy", "Restless", "Terrifying", "Terrifyingly", 
        "Horror-stricken", "Horror-struck", "Horror-stricken", "Horrifying", "Horrify", "Chill", "Chilly", 
        "Creepy", "Creep", "Creepiness", "Spooky", "Specter", "Ghostly", "Eerie", "Eerily", "Ghastly", 
        "Faint-hearted", "Afraid", "Afraidness", "Frightened", "Frightful", "Frightfully", "Intimidated", 
        "Intimidating", "Intimidatingly", "Petrifying", "Petrify", "Petrifyingly", "Panicked", "Panicking", 
        "Panicky", "Hysterical", "Hysterically", "Hysterics", "Scared", "Scary", "Scare", "Scarily"
    ];
    
    
    return (
        <>
            {generateFeelings(fearFeelings)}
        </>
    )
}

export default Fear;