import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

export const SUPABASE_URL = "https://qiqlnyfdkdexsteztfbm.supabase.co";
export const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcWxueWZka2RleHN0ZXp0ZmJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5MTU1ODcsImV4cCI6MjA4MjQ5MTU4N30.DCtR-FlLDu_eF3_QbsB5-2d9EkEWfOi2O5xB1VkACH0";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON
);
