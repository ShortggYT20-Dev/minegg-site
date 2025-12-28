const ip = localStorage.getItem("serverIP") || "play.minegg.net";
const refresh = (localStorage.getItem("refreshInterval") || 30) * 1000;

document.getElementById("server-ip").textContent = ip;
document.getElementById("discordWidget").src =
  localStorage.getItem("discordWidget") || "";

async function fetchStatus() {
  const res = await fetch(`https://api.mcsrvstat.us/2/${ip}`);
  const data = await res.json();

  document.getElementById("motd").innerHTML = data.motd?.html?.join("") || "";
  document.getElementById("players").textContent =
    `${data.players.online}/${data.players.max} online`;

  document.getElementById("server-icon").src = data.icon || "";
}

fetchStatus();
setInterval(fetchStatus, refresh);

function copyIP() {
  navigator.clipboard.writeText(ip);
  document.getElementById("toast").classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}
