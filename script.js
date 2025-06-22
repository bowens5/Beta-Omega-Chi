document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login');
    const calendarSection = document.getElementById('calendar');
    const loginForm = document.getElementById('loginForm');
    const eventForm = document.getElementById('eventForm');
    const eventList = document.getElementById('eventList');
    const logoutBtn = document.getElementById('logoutBtn');

    function getUser() {
        return localStorage.getItem('loggedInUser');
    }

    function eventsKey() {
        return `events_${getUser()}`;
    }

    function show(section) {
        section.classList.remove('hidden');
    }

    function hide(section) {
        section.classList.add('hidden');
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem(eventsKey())) || [];
        eventList.innerHTML = '';
        events.forEach((ev, index) => {
            const li = document.createElement('li');
            li.textContent = `${ev.date}: ${ev.desc}`;
            eventList.appendChild(li);
        });
    }

    function checkLogin() {
        if (getUser()) {
            hide(loginSection);
            show(calendarSection);
            loadEvents();
        } else {
            show(loginSection);
            hide(calendarSection);
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        if (username) {
            localStorage.setItem('loggedInUser', username);
            loginForm.reset();
            checkLogin();
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        checkLogin();
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('eventDate').value;
        const desc = document.getElementById('eventDesc').value.trim();
        if (date && desc) {
            const events = JSON.parse(localStorage.getItem(eventsKey())) || [];
            events.push({ date, desc });
            localStorage.setItem(eventsKey(), JSON.stringify(events));
            eventForm.reset();
            loadEvents();
        }
    });

    checkLogin();
});
