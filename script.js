/* ---------- NAV ---------- */
function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}

/* ---------- COPY IP ---------- */
function copyIP() {
  const ip = localStorage.getItem("serverIP") || "play.minegg.net";
  navigator.clipboard.writeText(ip);

  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

/* ---------- ADMIN NAV ---------- */
const adminLink = document.getElementById("adminLink");
const expiry = localStorage.getItem("adminExpiry");

if (
  adminLink &&
  localStorage.getItem("adminAuth") === "true" &&
  expiry &&
  Date.now() < expiry
) {
  adminLink.textContent = "Admin Panel";
  adminLink.href = "admin.html";
}

/* ---------- DISCORD ---------- */
const discordWidget = document.getElementById("discordWidget");
const discordURL = localStorage.getItem("discordWidget");
if (discordWidget && discordURL) {
  discordWidget.src = discordURL;
}

/* ---------- MINECRAFT STATUS ---------- */
const serverIP = localStorage.getItem("serverIP") || "play.minegg.net";
const refreshInterval =
  (localStorage.getItem("refreshInterval") || 30) * 1000;

const serverIpEl = document.getElementById("server-ip");
const statusTextEl = document.getElementById("status-text");
const playersEl = document.getElementById("players");
const motdEl = document.getElementById("motd");
const iconEl = document.getElementById("server-icon");
const playerListEl = document.getElementById("player-list");

async function loadStatus() {
  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
    const data = await res.json();

    serverIpEl.textContent = serverIP;

    if (!data.online) {
      statusTextEl.textContent = "🔴 Offline";
      return;
    }

    statusTextEl.textContent = "🟢 Online";
    motdEl.innerHTML = data.motd?.html?.join("<br>") || "";
    playersEl.textContent = `${data.players.online}/${data.players.max} Players`;

    if (data.icon) iconEl.src = data.icon;

    playerListEl.innerHTML = "";
    if (data.players.list) {
      data.players.list.forEach(name => {
        const img = document.createElement("img");
        img.src = `https://mc-heads.net/avatar/${name}/32`;
        img.title = name;
        playerListEl.appendChild(img);
      });
    }
  } catch (err) {
    statusTextEl.textContent = "⚠️ Error loading status";
    console.error(err);
  }
}

loadStatus();
setInterval(loadStatus, refreshInterval);
