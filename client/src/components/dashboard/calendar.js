import {useRef, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { useNavigate } from 'react-router-dom'; // Import the useHistory hook
import './dashboard.css';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


function fetchDatesInMonth(user_id, date, { signal }, retries = 3) {
  return new Promise((resolve, reject) => {
    const body = {
      user_id: user_id,
      month: date.month() + 1,
      year: date.year(),
    };
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}/api/dashboard/get-active-days`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      signal: signal
    })
    .then(response => response.json())
    .then(data => {
      console.log("all journals ", data.active_dates);
      const daysToHighlight = data.active_days;
      resolve({ daysToHighlight });
    })
    .catch(error => {
      console.error('Error:', error);
      if (retries > 0) {
        console.log(`Retrying... attempts left: ${retries - 1}`);
        setTimeout(() => {
          fetchDatesInMonth(user_id, date, { signal }, retries - 1)
            .then(resolve)
            .catch(reject);
        }, 2000); // Wait for 2 second before retrying
      } else {
        reject(error);
      }
    });
  });
}


const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🔥' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest({userId}) {
  const requestAbortController = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(value)
    navigate('/journal-that-day', { state: { userId: userId, date: value.toDate()} });
}
  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fetchDatesInMonth(userId, date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    console.log(date.month())
    console.log(date.toDate())
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <div className="calendar-container">
        <p>Activity calendar</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onChange={handleChange}
                onMonthChange={handleMonthChange}
                onYearChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                day: ServerDay,
                }}
                slotProps={{
                day: {
                    highlightedDays,
                },
                }} 
            />
        </LocalizationProvider>
    </div>
    
  );
}
