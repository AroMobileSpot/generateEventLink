import fs from "fs";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT3c6ELF17Mq1eO3t010kssVaTmWu5sek",
  authDomain: "test-lab-1be41.firebaseapp.com",
  projectId: "test-lab-1be41",
  storageBucket: "test-lab-1be41.appspot.com",
  messagingSenderId: "1018799592932",
  appId: "1:1018799592932:web:a767d4485bab2938ed63f1",
  measurementId: "G-JFF5FC7NEQ",
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

export const addEventToStore = async (req, res, next) => {
  const { idCal, dataLink } = req.body || {};
  // console.log("pathToData", pathToData);
  await setDoc(doc(db, "Events", idCal), {
    dataLink,
  });

  // fs.readFile(pathToData, "utf8", (err, data) => {
  //   if (err) throw err;
  //   const jsonData = JSON.parse(data);
  //   jsonData[idCal] = dataLink;
  //   fs.writeFile(pathToData, JSON.stringify(jsonData), "utf8", (err) => {
  //     if (err) throw err;
  //     console.log("Data written to file");
  res.send({ message: "Event add to Store" });
  //   });
  // });
};

export const getEvent = async (id) => {
  const refs = doc(db, "Events", id);
  const docs = await getDoc(refs);
  if (docs.exists()) {
    console.log("Document data is stored");
    return docs.data().dataLink;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  // return new Promise((resolve, reject) => {
  //   fs.readFile(pathToData, "utf8", (err, data) => {
  //     if (err) reject(err);
  //     const jsonData = JSON.parse(data);
  //     resolve(jsonData[id]);
  //   });
  // });
};
