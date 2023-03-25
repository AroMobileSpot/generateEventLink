import express from "express";
const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/calendar", (req, res) => {
  const { query } = req;
  console.log("query", query);
  const { idCal } = query;
  const fileName = "AnayaEvent.ics";
  res.set("Content-Disposition", 'attachment; filename="' + fileName + '"');
  res.send(idCal);
});

export default router;
