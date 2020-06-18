import React, { Fragment, useContext } from "react";
import GlobalContext from "../GlobalContext";

function MuraDecorator(props) {
  const [isEditMode] = useContext(GlobalContext);
  console.log("MuraDecorator -> isEditMode", isEditMode);
  let domObject = {};
  Object.keys(props).forEach((key) => {
    if (isEditMode) {
      if (typeof props[key] === "string") {
        domObject[`data-${key}`] = props[key];
      }

      if (typeof props[key] === "object" && key !== "children") {
        domObject[`data-${key}`] = JSON.stringify(props[key]);
      }
    }

    if (key === "class") {
      domObject[`className`] = `mura-object mura-async-object ${props[key]}`;
    }
  });

  return (
    <div {...domObject}>
      {props.children}
    </div>
  );
}

export default MuraDecorator;
