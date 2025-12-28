const ip = localStorage.getItem("serverIP") || "play.minegg.net";
const refresh = (localStorage.getItem("refreshInterval") || 30) * 1000;

document.getElementById("server-ip").textContent = ip;
document.getElementById("join-ip").textContent = ip;

const discordURL = localStorage.getItem("discordWidget");
if (discordURL) {
  document.getElementById("discordWidget").src = discordURL;
}

async function fetchStatus() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
    const data = await res.json();

    document.getElementById("motd").innerHTML =
      data.motd?.html?.join("") || "No MOTD";

    document.getElementById("players").textContent =
      data.players
        ? `${data.players.online}/${data.players.max}`
        : "0/0";

    const pingEl = document.getElementById("ping");
    if (data.debug?.ping) {
      const p = data.debug.ping;
      pingEl.textContent = `${p} ms`;
      pingEl.className = p < 80 ? "good" : p < 150 ? "ok" : "bad";
    } else pingEl.textContent = "N/A";

    const status = document.getElementById("server-status");
    status.textContent = data.online ? "🟢 Online" : "🔴 Offline";
    status.className = `status-indicator ${data.online ? "online" : "offline"}`;

    if (data.icon) {
      document.getElementById("server-icon").src = data.icon;
    }

  } catch {
    document.getElementById("server-status").textContent = "🔴 Offline";
  }
}

fetchStatus();
setInterval(fetchStatus, refresh);

function copyIP() {
  navigator.clipboard.writeText(ip);
  const t = document.getElementById("toast");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2000);
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}
