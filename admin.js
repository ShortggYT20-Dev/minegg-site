const ipInput = document.getElementById("ipInput");
const refreshInput = document.getElementById("refreshInput");
const discordInput = document.getElementById("discordInput");
const saved = document.getElementById("saved");

ipInput.value = localStorage.getItem("serverIP") || "play.minegg.net";
refreshInput.value = localStorage.getItem("refreshInterval") || 30;
discordInput.value = localStorage.getItem("discordWidget") || "";

function save() {
  localStorage.setItem("serverIP", ipInput.value.trim());
  localStorage.setItem("refreshInterval", refreshInput.value);
  localStorage.setItem("discordWidget", discordInput.value.trim());

  saved.textContent = "Saved ✔";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
