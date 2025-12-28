const ip = localStorage.getItem("serverIP") || "play.minegg.net";
const refresh = (localStorage.getItem("refreshInterval") || 30) * 1000;

document.getElementById("server-ip").textContent = ip;

function fetchStatus() {
  fetch(`https://api.mcsrvstat.us/2/${ip}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("online").textContent = data.online ? "Online" : "Offline";
      document.getElementById("players").textContent =
        `${data.players?.online || 0}/${data.players?.max || 0}`;
      document.getElementById("motd").innerHTML = data.motd?.html?.join("<br>") || "";
      document.getElementById("ping").textContent =
        typeof data.debug?.ping === "number" ? data.debug.ping + " ms" : "-- ms";

      if (data.icon) document.getElementById("server-icon").src = data.icon;

      document.getElementById("player-list").innerHTML =
        data.players?.list?.map(p => `<div>${p}</div>`).join("") || "";
    });
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

const discord = localStorage.getItem("discordWidget");
if (discord) document.getElementById("discordWidget").src = discord;
