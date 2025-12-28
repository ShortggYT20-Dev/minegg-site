import { supabase } from "./supabase.js";
import { loadStatus } from "./status.js";
import { updateGraph } from "./graph.js";

const { data } = await supabase.from("settings").select("*").single();

document.getElementById("server-ip").textContent = data.server_ip;
document.getElementById("discordFrame").src =
  `https://discord.com/widget?id=${data.discord_server_id}&theme=dark`;

async function refresh() {
  const res = await fetch(`https://api.mcsrvstat.us/3/${data.server_ip}`);
  const d = await res.json();

  document.getElementById("players").textContent =
    `${d.players.online}/${d.players.max}`;

  document.getElementById("status-text").textContent =
    d.online ? "Online" : "Offline";

  document.getElementById("status-text").style.color =
    d.online ? "lime" : "red";

  updateGraph(d.players.online);
}

setInterval(refresh, 15000);
refresh();

window.copyIP = () => {
  navigator.clipboard.writeText(data.server_ip);
  document.getElementById("toast").classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
};
