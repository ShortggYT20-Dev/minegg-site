document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("playerGraph");
  if (!ctx) return;

  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Players Online",
        data: [],
        borderColor: "#6366f1",
        tension: 0.3
      }]
    }
  });

  setInterval(async () => {
    const r = await fetch("https://api.mcsrvstat.us/3/minegg.mine.bz");
    const d = await r.json();

    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(d.players?.online || 0);

    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.update();
  }, 15000);
});
