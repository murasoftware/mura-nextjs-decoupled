import React, { Fragment, useContext } from "react";
import GlobalContext from "../GlobalContext";

function MuraDecorator(props) {

  let isEditMode=true;

  try{
    [isEditMode] = useContext(GlobalContext);
  }catch(e){
    isEditMode=true;
  }
  //  console.log("MuraDecorator -> isEditMode", props);

  let domObject = {
    className : 'mura-object mura-async-object'
  };

  let domContent = {
    className : 'mura-object-content'
  };

  if(isEditMode){
    Object.keys(props).forEach((key) => {
      if (!['children','isEditMode','dynamicProps','moduleStyleData'].find((restrictedkey)=>{return restrictedkey==key})
      ) {
        if (typeof props[key] === "object") {
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
  } else {
    domObject["data-instanceid"]=props.instanceid;
    domObject.className=props.moduleStyleData[props.instanceid].targets.object.class;
    domObject.id=props.moduleStyleData[props.instanceid].targets.object.id;
    domObject["data-inited"]=true;
    domObject.className += ' mura-object-' + props.object;

    domContent.className=props.moduleStyleData[props.instanceid].targets.content.class
    domContent.id=props.moduleStyleData[props.instanceid].targets.content.id
  }



  return (
     <div {...domObject}>
      {props.label ? <MuraMeta label={props.label} labeltag={props.labeltag}></MuraMeta> : null }
      {props.label ? <div className="mura-flex-break"></div> : null}
      <div {...domContent}>
          {props.children}
      </div>
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
