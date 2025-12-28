async function loadSite() {
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  serverIP.textContent = data.server_ip;
  joinIP.textContent = data.server_ip;
  discordWidget.src = data.discord_widget;
}

async function loadStatus() {
  const res = await fetch(`https://api.mcsrvstat.us/3/${serverIP.textContent}`);
  const d = await res.json();

  players.textContent = `${d.players?.online || 0}/${d.players?.max || 0}`;
  statusText.textContent = d.online ? "Online" : "Offline";
  statusText.style.color = d.online ? "lime" : "red";
}

function copyIP() {
  navigator.clipboard.writeText(serverIP.textContent);
}

loadSite();
setInterval(loadStatus, 15000);
