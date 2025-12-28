function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "minegg") {
    localStorage.setItem("adminAuth", "true");
    localStorage.setItem("adminExpiry", Date.now() + 3600000);
    window.location.href = "admin.html";
  } else {
    document.getElementById("error").textContent = "Invalid login";
  }
}
