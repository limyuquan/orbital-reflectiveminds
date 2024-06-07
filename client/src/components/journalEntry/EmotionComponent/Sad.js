import React from "react";


const Sad = ({ generateFeelings }) => {

    const sadFeelings = [
        "Sadness", "Tears", "Heartache", "Loneliness", "Grief", "Despair", "Melancholy", "Sorrow", "Depression", "Anguish",
        "Misery", "Desolation", "Despondency", "Hopelessness", "Disappointment", "Pain", "Hurt", "Regret", "Wretchedness",
        "Despairing", "Unhappiness", "Bereavement", "Forlornness", "Heartbreak", "Suffering", "Woe", "Lament", "Anguished",
        "Mournful", "Dejected", "Weeping", "Lamentation", "Downhearted", "Distress", "Gloomy", "Morose", "Blue", "Grieving",
        "Disconsolate", "Dismal", "Depressing", "Deplorable", "Tragic", "Disheartened", "Brokenhearted", "Unhappy", "Upset",
        "Wounded", "Weepy", "Somber", "Joyless", "Sombre", "Dispirited", "Downcast", "Dejecting", "Funereal", "Melancholic",
        "Miserable", "Down", "Crushed", "Unconsolable", "Dispiriting", "Troubled", "Heavyhearted", "Lugubrious", "Pensive",
        "Cheerless", "Sorry", "Tortured", "Bitterness", "Gloom", "Darkness", "Crestfallen", "Heavy-hearted", "Tearful",
        "Distressed", "Agonized", "Affliction", "Heart-rending", "Depressant", "Discontent", "Down in the dumps", "Doleful",
        "Bemoaning", "Despondent", "Tear-jerking", "Sorrowful", "Bleak", "Melancholia", "Sullen", "Glum", "Weepiness",
        "Pathos", "Downheartedness", "Melancholy ", "Aching", "Deploring", "Despond", "Lugubriously", "Angst", "Lachrymose"
    ];
    


    return (
        <>
            {generateFeelings(sadFeelings)}
        </>
    )
}

export default Sad;