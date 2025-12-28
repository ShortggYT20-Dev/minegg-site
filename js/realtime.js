import { supabase } from "./supabase.js";
import { loadStatus } from "./status.js";

supabase
  .channel("settings-live")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "settings" },
    payload => {
      loadStatus(payload.new.server_ip);
    }
  )
  .subscribe();
