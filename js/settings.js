import { supabase } from "./supabase.js";

const ipInput = document.getElementById("serverIP");
const discordInput = document.getElementById("discordID");
const saveBtn = document.getElementById("saveSettings");

async function loadSettings() {
  const { data } = await supabase
    .from("settings")
    .select("*")
    .single();

  ipInput.value = data.server_ip;
  discordInput.value = data.discord_server_id;
}

async function saveSettings() {
  await supabase
    .from("settings")
    .update({
      server_ip: ipInput.value,
      discord_server_id: discordInput.value,
      updated_at: new Date()
    })
    .eq("id", 1);

  alert("Saved!");
}

saveBtn?.addEventListener("click", saveSettings);
loadSettings();
