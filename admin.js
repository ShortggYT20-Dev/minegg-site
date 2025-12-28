ip.value = localStorage.getItem("serverIP") || "play.minegg.net";
refresh.value = localStorage.getItem("refreshInterval") || 30;
discord.value = localStorage.getItem("discordWidget") || "";

function save() {
  localStorage.setItem("serverIP", ip.value.trim());
  localStorage.setItem("refreshInterval", refresh.value);
  localStorage.setItem("discordWidget", discord.value.trim());
  saved.textContent = "Saved ✔";
  setTimeout(() => location.reload(), 1000);
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
