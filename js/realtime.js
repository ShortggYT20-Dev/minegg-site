supabase.channel("settings")
  .on("postgres_changes",
    { event: "*", table: "site_settings" },
    () => location.reload()
  )
  .subscribe();
