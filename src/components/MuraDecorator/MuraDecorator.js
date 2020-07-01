import React, { Fragment, useContext } from "react";
import GlobalContext from "../GlobalContext";
import Mura from "mura.js";

function MuraDecorator(props) {
  const [isEditMode] = useContext(GlobalContext);
//  console.log("MuraDecorator -> isEditMode", props);
  let domObject = {
    className : 'mura-object mura-async-object'
  };

  Object.keys(props).forEach((key) => {
    if ((isEditMode || true) && key !== "children") {
      if (typeof props[key] === "object" && key !== "children" && key !='flashdata') {
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
      {props.label ? <MuraMeta label={props.label} labeltag={props.labeltag}></MuraMeta> : null }
      {props.label ? <div className="mura-flex-break"></div> : null}
      <div className="mura-object-content">
          {props.children}
      </div>
      <div className="footer"></div>
    </div>
  );
}

const MuraMeta = ({label,labeltag}) => {
	const LabelHeader = labeltag ? `${labeltag}` : 'h2';

	return (
		<div className="mura-object-meta-wrapper">
			<div className="mura-object-meta">
				<LabelHeader>{label}</LabelHeader>
			</div>
		</div>	
	)
}

export default MuraDecorator;
