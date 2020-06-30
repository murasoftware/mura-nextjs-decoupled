import React, { Fragment, useContext } from "react";
import GlobalContext from "../GlobalContext";
import MuraHelper from "../../helpers/MuraHelper";
import MuraMeta from "../MuraMeta";
import Mura from "mura.js";

function MuraDecorator(props) {
  const [isEditMode] = useContext(GlobalContext);
//  console.log("MuraDecorator -> isEditMode", props);
  let domObject = {
    className : 'mura-object mura-async-object'
  };

  if(Mura.isInNode()){
    Mura.recordModuleStyles(Object.assign({},props));
  }

  Object.keys(props).forEach((key) => {
    if ((isEditMode || true) && key !== "children") {
      if (typeof props[key] === "object" && key !== "children") {
        domObject[`data-${key}`] = JSON.stringify(props[key]);
      } else if(typeof props[key] != 'undefined'
      && !(typeof props[key] === "string" && props[key] == ''))
      {
        domObject[`data-${key}`] = props[key];
      }
    }

    if (key === "class") {
      domObject.className += ` ${props[key]}`;
    }
  });

  return (
     <div {...domObject}>
      {props.label ?
        <MuraMeta label={props.label} labeltag={props.labeltag}></MuraMeta>
        :
        null
      }
      <div className="mura-object-content">
          {props.children}
      </div>
    </div>
  );
}

export default MuraDecorator;
