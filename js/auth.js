import { supabase } from "./supabase.js";

const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "admin.html";
    }
  });
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}
