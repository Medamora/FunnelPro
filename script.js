// Countdown Timer (24hr urgency)
function countdown() {
    let timeLeft = 24 * 60 * 60; // 24 hours
    setInterval(() => {
        let days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft % 86400) / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        timeLeft--;
    }, 1000);
}
countdown();

// FAQ Accordion
function togglePanel(id) {
    let panel = document.getElementById(id);
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}
