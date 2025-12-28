const themeSwitch = document.getElementById('themeSwitch');
const themeLabel = document.getElementById('themeLabel');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeSwitch.checked = savedTheme === 'light';
  themeLabel.textContent = savedTheme === 'light' ? "Light Mode" : "Dark Mode";
}

// Toggle dark/light
themeSwitch.addEventListener('change', () => {
  const theme = themeSwitch.checked ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
  themeLabel.textContent = themeSwitch.checked ? "Light Mode" : "Dark Mode";
});

// Fetch MC Server Status
async function fetchServerStatus() {
  try {
    const res = await fetch(`https://api.mcstatus.io/v2/status/java/minegg.mine.bz`);
    const data = await res.json();

    const online = data.online;
    document.getElementById("statusIndicator").className = online
      ? 'status-indicator online'
      : 'status-indicator offline';
    document.getElementById("serverStatusText").textContent = online
      ? "Server is Online"
      : "Server is Offline";

    document.getElementById("onlinePlayers").textContent = online
      ? data.players.online
      : '0';
    document.getElementById("maxPlayers").textContent = data.players.max;
    document.getElementById("version").textContent = data.version.name_clean || '-';
    document.getElementById("ping").textContent = online
      ? `${data.ping} ms`
      : '-';

    // get server icon
    document.getElementById("serverIcon").src =
      `https://api.mcstatus.io/v2/icon/minegg.mine.bz`;
  } catch (err) {
    document.getElementById("serverStatusText").textContent = "Error loading status";
  }
}

// Load & refresh
fetchServerStatus();
setInterval(fetchServerStatus, 30000);
