import React from "react";
import { NavLink } from "react-router-dom";

export const Page = (props) => {
  return (
    <>
      <NavLink to={"/Home"}>Home</NavLink>
      <h1>Page 1</h1>
    </>
  );
};
