import React, { useContext } from 'react';
import GlobalContext from '../GlobalContext';

function MuraDecorator(props) {
  const { label, instanceid, labeltag, children } = props;
  let isEditMode = true;

  try {
    [isEditMode] = useContext(GlobalContext);
  } catch (e) {
    isEditMode = true;
  }
  //  console.log("MuraDecorator -> isEditMode", props);

  const domObject = {
    className: 'mura-object mura-async-object',
  };

  const domContent = {
    className: 'mura-object-content',
  };

  if (isEditMode) {
    Object.keys(props).forEach(key => {
      if (
        !['children', 'isEditMode', 'dynamicProps', 'moduleStyleData'].find(
          restrictedkey => restrictedkey === key,
        )
      ) {
        if (typeof props[key] === 'object') {
          domObject[`data-${key}`] = JSON.stringify(props[key]);
        } else if (
          typeof props[key] !== 'undefined' &&
          !(typeof props[key] === 'string' && props[key] === '')
        ) {
          domObject[`data-${key}`] = props[key];
        }
      }
      if (key === 'class') {
        domObject.className += ` ${props[key]}`;
      }
    });
  } else {
    domObject['data-instanceid'] = instanceid;
    domObject.className =
      props.moduleStyleData[instanceid].targets.object.class;
    domObject.id = props.moduleStyleData[props.instanceid].targets.object.id;
    domObject['data-inited'] = true;
    domObject.className += ` mura-object-${props.object}`;
    domContent.className =
      props.moduleStyleData[props.instanceid].targets.content.class;
    domContent.id = props.moduleStyleData[props.instanceid].targets.content.id;

    ['objectspacing','contentspacing','metaspacing'].forEach((key)=>{
      if(typeof props[key] != 'undefined' && props[key] && props[key] != 'custom'){
        domObject['data-' + key] = props[key];
      }
    });
  }

  return (
    <div {...domObject}>
      {label ? <MuraMeta label={label} labeltag={labeltag} /> : null}
      {label ? <div className="mura-flex-break" /> : null}
      <div {...domContent}>{children}</div>
    </div>
  );
}

const MuraMeta = ({ label, labeltag }) => {
  const LabelHeader = labeltag ? `${labeltag}` : 'h2';
  return (
    <div className="mura-object-meta-wrapper">
      <div className="mura-object-meta">
        <LabelHeader>{label}</LabelHeader>
      </div>
    </div>
  );
};

export default MuraDecorator;
