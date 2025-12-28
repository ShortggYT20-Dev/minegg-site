async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  });

  if (error) {
    document.getElementById("error").textContent = error.message;
  } else {
    location.href = "admin.html";
  }
}

async function logout() {
  await supabase.auth.signOut();
  location.href = "login.html";
}
