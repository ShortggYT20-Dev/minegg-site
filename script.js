const ip = localStorage.getItem("serverIP") || "play.minegg.net";
const refresh = (localStorage.getItem("refreshInterval") || 30) * 1000;

document.getElementById("server-ip").textContent = ip;

function fetchStatus() {
  fetch(`https://api.mcsrvstat.us/2/${ip}`)
    .then(r => r.json())
    .then(d => {
      online.textContent = d.online ? "🟢 Online" : "🔴 Offline";
      players.textContent = `${d.players?.online || 0}/${d.players?.max || 0}`;
      motd.innerHTML = d.motd?.html?.join("<br>") || "";
      ping.textContent =
        typeof d.debug?.ping === "number" ? d.debug.ping + " ms" : "-- ms";

      if (d.icon) serverIcon.src = d.icon;

      playerList.innerHTML =
        d.players?.list?.map(p => `<div>${p}</div>`).join("") || "";
    });
}

fetchStatus();
setInterval(fetchStatus, refresh);

function copyIP() {
  navigator.clipboard.writeText(ip);
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}

const discord = localStorage.getItem("discordWidget");
if (discord) discordWidget.src = discord;
