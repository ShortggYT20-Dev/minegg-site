const serverIP = localStorage.getItem("serverIP") || "play.minegg.net";
const discordURL = localStorage.getItem("discordWidget") || "";

document.getElementById("server-ip").textContent = `IP: ${serverIP}`;
document.getElementById("discordWidget").src = discordURL;

const ctx = document.getElementById("playerChart");
let history = JSON.parse(localStorage.getItem("playerHistory")) || [];

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: history,
      borderColor: "#6366f1",
      tension: 0.4
    }]
  }
});

async function fetchStatus() {
  const start = performance.now();
  const res = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
  const data = await res.json();
  const ping = Math.round(performance.now() - start);

  const pingEl = document.getElementById("ping");
  pingEl.textContent = `${ping} ms`;

  pingEl.className = "ping " +
    (ping < 80 ? "good" : ping < 150 ? "ok" : "bad");

  document.getElementById("status-text").textContent =
    data.online ? "Online" : "Offline";

  document.getElementById("players").textContent =
    `Players: ${data.players?.online || 0}/${data.players?.max || 0}`;

  document.getElementById("motd").innerHTML =
    data.motd?.html?.join("") || "";

  if (data.icon) {
    document.getElementById("server-icon").src = data.icon;
  }

  history.push(data.players?.online || 0);
  if (history.length > 20) history.shift();

  chart.data.labels = history.map((_, i) => i);
  chart.data.datasets[0].data = history;
  chart.update();

  localStorage.setItem("playerHistory", JSON.stringify(history));
}

fetchStatus();
setInterval(fetchStatus, (localStorage.getItem("refreshInterval") || 30) * 1000);

function copyIP() {
  navigator.clipboard.writeText(serverIP);
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1500);
}

function toggleMenu() {
  document.getElementById("nav-menu").classList.toggle("show");
}
