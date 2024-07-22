import React, { useEffect, useState } from 'react';
import './achievement.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AchievementItem from './AchievementItem';
import Loader from '../shared/loader';

function Achievements() {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state?.userId || null;
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState([]);
    const [statistics, setStatistics] = useState({
        daysSinceJoined: 0,
        totalEntries: 0,
        totalWords: 0,
        averageWordsPerEntry: 0,
        currentStreak: 0
    });

    useEffect(() => {
        if (userId === null) {
            navigate('/login');
        } else {
            getAchievementsData();
        }
    }, [userId, navigate]);

    const navigateBack = () => {
        navigate('/dashboard', { state: { userId: userId } });
    }

    const getAchievementsData = () => {
        // Fetch achievements data from the server
        const body = {
            user_id: userId,
        }
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(`${apiUrl}/api/dashboard/get-achievements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(data => {
                setAchievements(data.achievements);
                setStatistics(data.statistics);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }

    let achievementsList = [
        {
            index: 0,
            title: "First Entry 🎉",
            description: "Write your first journal entry",
        },
        {
            index: 1,
            title: "5-Day Streak 🌟",
            description: "Write a journal entry for 5 consecutive days",
        },
        {
            index: 2,
            title: "10-Day Streak 🌟🌟",
            description: "Write a journal entry for 10 consecutive days",
        },
        {
            index: 3,
            title: "25-Day Streak 🌟🌟🌟",
            description: "Write a journal entry for 25 consecutive days",
        },
        {
            index: 4,
            title: "50-Day Streak 🌟🌟🌟🌟",
            description: "Write a journal entry for 50 consecutive days",
        },
        {
            index: 5,
            title: "100-Day Streak 🌟🌟🌟🌟🌟",
            description: "Write a journal entry for 100 consecutive days",
        },
        {
            index: 6,
            title: "500 Words 📝",
            description: "Write a total of 500 words",
        },
        {
            index: 7,
            title: "1000 Words 📝📝",
            description: "Write a total of 1000 words",
            status: "Incomplete"
        },
        {
            index: 8,
            title: "2000 Words 📝📝📝",
            description: "Write a total of 2000 words",
        },
    ];


    return (
        <div className="achievements">
            {loading && <Loader />}
            <div className="achievements-header">
                <h1 className="achievements-title"><i data-testid="navigate-back-button" className="fas fa-angle-left achievements-back" onClick={() => navigateBack()}></i>Achievements <i class="fa fa-trophy achievements-achievement-icon" ></i></h1>
            </div>
            <div className="statistics-content">
                <div className="statistics-content-header">
                    <h2 className="statistics-content-title">Statistics</h2>
                </div>
                <div className="statistics-content-body">
                    <div className="statistics-content-item">
                        <h3 className="statistics-content-item-title">Days since joined 📅</h3>
                        <p className="statistics-content-item-value">{statistics.daysSinceJoined}</p>
                    </div>
                    <div className="statistics-content-item">
                        <h3 className="statistics-content-item-title">Total Entries 👨‍🎨</h3>
                        <p className="statistics-content-item-value">{statistics.totalEntries}</p>
                    </div>
                    <div className="statistics-content-item">
                        <h3 className="statistics-content-item-title">Total Words ✍️</h3>
                        <p className="statistics-content-item-value">{statistics.totalWords}</p>
                    </div>
                    <div className="statistics-content-item">
                        <h3 className="statistics-content-item-title">Average Words per Entry ✏️</h3>
                        <p className="statistics-content-item-value">{statistics.averageWordsPerEntry}</p>
                    </div>
                    <div className="statistics-content-item">
                        <h3 className="statistics-content-item-title">Current Streak 🔥</h3>
                        <p className="statistics-content-item-value">{statistics.currentStreak}</p>
                    </div>
                </div>
            </div>
            <div className="achievements-content">
                <div className="achievements-content-header">
                    <h2 className="achievements-content-title">Achievements</h2>
                </div>
                <div className="achievements-content-body">
                    {achievementsList.map((achievement, index) => {
                        return <AchievementItem key={index} title={achievement.title} description={achievement.description} status={achievement.index in achievements} />;
                    })}
                </div>

            </div>
        </div>
    );
}

export default Achievements;