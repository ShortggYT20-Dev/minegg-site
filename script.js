const API = "https://api.mcsrvstat.us/2/";
const serverIP = localStorage.getItem("serverIP") || "play.minegg.net";

document.getElementById("server-ip").textContent = serverIP;

function fetchStatus() {
  fetch(API + serverIP)
    .then(res => res.json())
    .then(data => {
      const statusText = document.getElementById("status-text");
      const players = document.getElementById("players");
      const motd = document.getElementById("motd");
      const icon = document.getElementById("server-icon");
      const ping = document.getElementById("ping");

      if (data.online) {
        statusText.textContent = "Online";
        statusText.className = "status-online";

        players.textContent = `${data.players.online}/${data.players.max}`;
        motd.textContent = data.motd.clean.join(" ");
        icon.src = data.icon || "";
        ping.textContent = data.debug?.ping ? `${data.debug.ping} ms` : "-- ms";
      } else {
        statusText.textContent = "Offline";
        statusText.className = "status-offline";

        players.textContent = "0/0";
        motd.textContent = "Server is offline";
        icon.src = "";
        ping.textContent = "-- ms";
      }
    });
}

fetchStatus();
setInterval(fetchStatus, 30000);

/* UI */

function copyIP() {
  navigator.clipboard.writeText(serverIP);
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}
