import React from "react";
import {
  MenuList as MTMenuList,
  MenuListProps,
} from "@material-tailwind/react";

// Override props to exclude problematic ones
type CustomMenuListProps = Omit<
  MenuListProps,
  "placeholder" | "onPointerEnterCapture" | "onPointerLeaveCapture"
>;




export default MenuList;



