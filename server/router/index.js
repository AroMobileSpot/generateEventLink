import express from "express";
import { addEventToStore, getEvent } from "../src/store";
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/calendar", async (req, res) => {
  const { query } = req;
  console.log("query", query);
  const { idCal } = query;
  const downloadFile = await getEvent(idCal);
  console.log("downloadFile", downloadFile);
  const fileName = "AnayaEvent.ics";
  res.set("Content-Type", "text/calendar; charset=utf-8");
  res.set("Content-Disposition", 'attachment; filename="' + fileName + '"');
  res.send(`${downloadFile}`);
});

router.post("/addEvent", addEventToStore);

export default router;
