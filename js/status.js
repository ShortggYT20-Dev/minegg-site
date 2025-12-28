const statusText = document.getElementById("status-text");
const playerList = document.getElementById("player-list");

async function loadStatus(ip) {
  const res = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
  const data = await res.json();

  statusText.textContent = data.online ? "Online" : "Offline";
  statusText.style.color = data.online ? "#22c55e" : "#ef4444";

  playerList.innerHTML = "";

  if (data.players?.list) {
    data.players.list.forEach(p => {
      const img = document.createElement("img");
      img.src = `https://mc-heads.net/avatar/${p}/32`;
      img.title = p;
      playerList.appendChild(img);
    });
  }
}

export { loadStatus };
