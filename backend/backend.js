import express from "express";
import fetch from "node-fetch";
const app = express();

app.get("/status", async (req,res)=>{
  const data = await fetch("https://api.mcsrvstat.us/3/minegg.mine.bz").then(r=>r.json());
  res.json(data);
});

app.listen(3000);
