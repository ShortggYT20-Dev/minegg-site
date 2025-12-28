const ip = "minegg.mine.bz";

fetch(`https://api.mcsrvstat.us/3/${ip}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("server-ip").textContent = ip;
    document.getElementById("players").textContent =
      `${data.players?.online || 0}/${data.players?.max || 0}`;

    const status = document.getElementById("status-text");
    if (data.online) {
      status.textContent = "Online";
      status.className = "online";
    } else {
      status.textContent = "Offline";
      status.className = "offline";
    }

    if (data.icon) {
      document.getElementById("server-icon").src = data.icon;
    }
  });

  window.addEventListener("load", () => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    const target = document.getElementById(id);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  }
});


function toggleTheme() {
  const body = document.body;
  body.dataset.theme =
    body.dataset.theme === "dark" ? "light" : "dark";
}
