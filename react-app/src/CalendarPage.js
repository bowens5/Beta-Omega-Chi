import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function eventsKey() {
  return 'events_2004';
}

function CalendarPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (localStorage.getItem('loggedIn') !== 'yes') {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(eventsKey())) || [];
    setEvents(stored);
  }, []);

  const addEvent = (e) => {
    e.preventDefault();
    if (date && desc) {
      const newEvents = [...events, { date, desc }];
      localStorage.setItem(eventsKey(), JSON.stringify(newEvents));
      setEvents(newEvents);
      setDate('');
      setDesc('');
    }
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/');
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const map = {};
  events.forEach((ev) => {
    if (!map[ev.date]) map[ev.date] = [];
    map[ev.date].push(ev.desc);
  });

  const cells = [];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekDays.forEach((d) => {
    cells.push(
      <div key={'h' + d} className="calendar-cell header">
        {d}
      </div>
    );
  });

  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={'e' + i} className="calendar-cell"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateKey = `${year}-${mm}-${dd}`;
    cells.push(
      <div key={day} className="calendar-cell">
        <div className="date">{day}</div>
        {map[dateKey] &&
          map[dateKey].map((d, idx) => <div key={idx}>{d}</div>)}
      </div>
    );
  }

  return (
    <section id="calendar">
      <h2>Your Calendar</h2>
      <form onSubmit={addEvent} id="eventForm">
        <label htmlFor="eventDate">Date:</label>
        <input
          type="date"
          id="eventDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label htmlFor="eventDesc">Description:</label>
        <input
          type="text"
          id="eventDesc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>
      <div id="calendarGrid" className="calendar-grid">
        {cells}
      </div>
      <button id="logoutBtn" onClick={logout}>
        Logout
      </button>
    </section>
  );
}

export default CalendarPage;
