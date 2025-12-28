async function save() {
  await supabase.from("site_settings").update({
    server_ip: ip.value,
    discord_widget: discord.value
  }).eq("id", 1);

  location.reload();
}
