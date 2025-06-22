document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const calendarSection = document.getElementById('calendar');
    const eventForm = document.getElementById('eventForm');
    const calendarGrid = document.getElementById('calendarGrid');
    const logoutBtn = document.getElementById('logoutBtn');

    function isLoggedIn() {
        return localStorage.getItem('loggedIn') === 'yes';
    }

    function eventsKey() {
        return 'events_2004';
    }

    function buildCalendar() {
        if (!calendarGrid) return;
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const events = JSON.parse(localStorage.getItem(eventsKey())) || [];
        const map = {};
        events.forEach(ev => {
            if (!map[ev.date]) map[ev.date] = [];
            map[ev.date].push(ev.desc);
        });

        calendarGrid.innerHTML = '';
        const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        weekDays.forEach(d => {
            const head = document.createElement('div');
            head.className = 'calendar-cell header';
            head.textContent = d;
            calendarGrid.appendChild(head);
        });

        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-cell';
            calendarGrid.appendChild(empty);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';
            const dateDiv = document.createElement('div');
            dateDiv.className = 'date';
            dateDiv.textContent = day;
            cell.appendChild(dateDiv);

            const mm = String(month + 1).padStart(2, '0');
            const dd = String(day).padStart(2, '0');
            const dateKey = `${year}-${mm}-${dd}`;
            if (map[dateKey]) {
                map[dateKey].forEach(desc => {
                    const p = document.createElement('div');
                    p.textContent = desc;
                    cell.appendChild(p);
                });
            }
            calendarGrid.appendChild(cell);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const pwd = document.getElementById('password').value.trim();
            if (pwd === '2004') {
                localStorage.setItem('loggedIn', 'yes');
                window.location.href = 'index.html';
            } else {
                alert('Incorrect password');
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedIn');
            window.location.href = 'login.html';
        });
    }

    if (eventForm) {
        eventForm.addEventListener('submit', e => {
            e.preventDefault();
            const date = document.getElementById('eventDate').value;
            const desc = document.getElementById('eventDesc').value.trim();
            if (date && desc) {
                const events = JSON.parse(localStorage.getItem(eventsKey())) || [];
                events.push({ date, desc });
                localStorage.setItem(eventsKey(), JSON.stringify(events));
                eventForm.reset();
                buildCalendar();
            }
        });
    }

    if (calendarSection) {
        if (!isLoggedIn()) {
            window.location.href = 'login.html';
            return;
        }
        calendarSection.classList.remove('hidden');
        buildCalendar();
    }
});
