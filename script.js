const serverIP = localStorage.getItem("serverIP") || "play.minegg.net";
const refreshTime =
  (parseInt(localStorage.getItem("refreshInterval")) || 30) * 1000;

const statusEl = document.getElementById("status-text");
const playersEl = document.getElementById("players");
const listEl = document.getElementById("player-list");
const iconEl = document.getElementById("server-icon");
const motdEl = document.getElementById("motd");
const ipEl = document.getElementById("server-ip");

ipEl.innerText = "IP: " + serverIP;

let refreshInterval = null;

function fetchServerStatus() {
  fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
    .then(res => res.json())
    .then(data => {
      if (!data) return;

      if (data.online) {
        statusEl.innerText = "🟢 Online";
        playersEl.innerText = `Players: ${data.players.online}/${data.players.max}`;
        listEl.innerText = data.players.list?.length
          ? "Online: " + data.players.list.join(", ")
          : "No players online";

        if (data.icon) iconEl.src = data.icon;
        if (data.motd?.clean) motdEl.innerText = data.motd.clean.join("\n");
      } else {
        statusEl.innerText = "🔴 Offline";
      }
    });
}

function startAutoRefresh() {
  if (!refreshInterval) {
    refreshInterval = setInterval(fetchServerStatus, refreshTime);
  }
}

fetchServerStatus();
startAutoRefresh();

document.addEventListener("visibilitychange", () => {
  if (document.hidden && refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  } else {
    fetchServerStatus();
    startAutoRefresh();
  }
});

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}

function copyIP() {
  navigator.clipboard.writeText(serverIP);
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}
