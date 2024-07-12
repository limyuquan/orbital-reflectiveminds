function AchievementItem(props) {

    const title = props.title;
    const description = props.description;
    const status = props.status;

    const statusClass = status ? "achieved" : "not-achieved";
    
    return (
        <div className="achievements-content-item">
            <h3 className="achievements-content-item-title">{title}</h3>
            <p className="achievements-content-item-description">{description}</p>
            <p className={`achievements-content-item-status ${statusClass}`}>{status ? "Achieved" : "Not Achieved"}</p>
        </div>
    );
}

export default AchievementItem;