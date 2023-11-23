import React, { ReactNode } from "react";
import ClippedDrawer from "./Drawer";

interface Props {
  children: ReactNode;
}

const TaxReturnLayout = ({ children }: Props) => {
  return <ClippedDrawer>{children}</ClippedDrawer>;
};

export default TaxReturnLayout;
