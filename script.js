// Theme toggle logic
const themeSwitch = document.getElementById('themeSwitch');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeSwitch.checked = savedTheme === 'light';
}
themeSwitch.addEventListener('change', () => {
  const theme = themeSwitch.checked ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
});

// Server Status Fetch
async function fetchServerStatus() {
  try {
    const res = await fetch(`https://api.mcstatus.io/v2/status/java/minegg.mine.bz`);
    const data = await res.json();
    document.getElementById("serverStatusText").textContent = data.online ? 'Online' : 'Offline';
    document.getElementById("onlinePlayers").textContent = data.players.online;
    document.getElementById("maxPlayers").textContent = data.players.max;
    document.getElementById("ping").textContent = `${data.ping} ms`;
    document.getElementById("version").textContent = data.version.name_clean || '-';
    document.getElementById("serverIcon").src = `https://api.mcstatus.io/v2/icon/minegg.mine.bz`;
  } catch {
    document.getElementById("serverStatusText").textContent = "Error loading";
  }
}
fetchServerStatus();
setInterval(fetchServerStatus, 30000);
