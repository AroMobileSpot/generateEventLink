import React, { useEffect, useState } from "react";
import { generateWhatsAppLink } from "./utils/generateLink";

export const App = () => {
  const [calendarLink, setLink] = useState("");
  // useEffect(() => {
  //   const redirectToDownload = async () => {
  //     const queryParams = new URLSearchParams(window.location.search);
  //     const params = {};
  //     for (const pair of queryParams.entries()) {
  //       params[pair[0]] = pair[1];
  //     }
  //     const { idCal } = params;
  //     // const querySnapshot = await getDocs(eventsCollection);
  //     // console.log("querySnapshot", querySnapshot);
  //     // querySnapshot.find((doc) => {
  //     //   console.log("docu event", doc);
  //     // });
  //     if (idCal) {
  //       window.location.href = idCal;
  //     }
  //   };
  //   redirectToDownload();
  // }, []);
  // console.log("calendarLink", calendarLink);

  const onClick = async () => {
    const result = await generateWhatsAppLink();
    setLink(result);
  };

  return (
    <>
      <h1>Hello vous</h1>
      <div onClick={onClick}>click ici pour générer un lien</div>
      <span>{calendarLink}</span>
    </>
  );
};
