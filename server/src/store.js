import fs from "fs";
import path from "path";

const pathToData = path.resolve("dist/data.json");

export const addEventToStore = (req, res, next) => {
  const { idCal, dataLink } = req.body || {};

  fs.readFile(pathToData, "utf8", (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    jsonData[idCal] = dataLink;
    fs.writeFile(pathToData, JSON.stringify(jsonData), "utf8", (err) => {
      if (err) throw err;
      console.log("Data written to file");
      res.send({ message: "Event add to Store" });
    });
  });
};

export const getEvent = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(pathToData, "utf8", (err, data) => {
      if (err) reject(err);
      const jsonData = JSON.parse(data);
      resolve(jsonData[id]);
    });
  });
};
