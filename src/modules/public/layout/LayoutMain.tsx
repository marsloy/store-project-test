import React, { FC, ReactNode } from "react";
import { NavBar } from "../components/NavBar";
/* import "./LayoutStyles.css"; */

interface Props {
  children: ReactNode;
}

export const LayoutMain: FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />

      {children}
    </>
  );
};
