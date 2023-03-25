import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../../shared/routes";
import { NoMatch } from "./Page/NoMatch.js";

export const App = () => {
  console.log("router");
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
  return (
    <React.Fragment>
      <Routes>
        {routes.map((route) => {
          const { path, component: C } = route;
          return <Route key={"key" + path} path={path} element={<C />} />;
        })}
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </React.Fragment>
  );
};
