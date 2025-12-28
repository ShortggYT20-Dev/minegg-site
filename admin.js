document.getElementById("ip").value =
  localStorage.getItem("serverIP") || "play.minegg.net";
document.getElementById("refresh").value =
  localStorage.getItem("refreshInterval") || 30;
document.getElementById("discord").value =
  localStorage.getItem("discordWidget") || "";

function save() {
  localStorage.setItem("serverIP", ip.value);
  localStorage.setItem("refreshInterval", refresh.value);
  localStorage.setItem("discordWidget", discord.value);
  document.getElementById("saved").textContent = "Saved ✔";
  setTimeout(() => location.reload(), 1000);
}

function logout() {
  localStorage.clear();
  location.href = "login.html";
}
