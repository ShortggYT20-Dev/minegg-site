function login() {
  if (document.getElementById("pass").value === "admin123") {
    localStorage.setItem("adminAuth", "true");
    localStorage.setItem("adminExpiry", Date.now() + 3600000);
    window.location = "admin.html";
  } else {
    document.getElementById("err").textContent = "Wrong password";
  }
}
