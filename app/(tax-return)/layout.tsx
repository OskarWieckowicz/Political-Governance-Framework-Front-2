import React, { ReactNode } from "react";
import ClippedDrawer from "../components/Drawer";

interface Props {
  children: ReactNode;
}

const TaxReturnLayout = ({ children }: Props) => {
  // return <ClippedDrawer>{children}</ClippedDrawer>;
  return children;
};

export default TaxReturnLayout;
