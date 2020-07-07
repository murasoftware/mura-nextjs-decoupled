import React from 'react';
import GlobalContext from '../GlobalContext';

function MuraStyles(props) {
  const { moduleStyleData } = props;

  let isEditMode = true;

  try {
    [isEditMode] = useContext(GlobalContext);
  } catch (e) {
    isEditMode = true;
  }

  // console.log("DIN: ",dynamicCSS);

  if (!isEditMode && typeof moduleStyleData !== 'undefined') {
    return (
      <div>
        {Object.keys(moduleStyleData).map(instanceid => {
          const rules = moduleStyleData[instanceid];
          return (
            <style
              id={rules.id}
              key={rules.id}
              dangerouslySetInnerHTML={{ __html: rules.cssRules.join('\n') }}
             />
          );
        })}
      </div>
    );
  } 
    // console.log("DYN IS NOT ARRAY: ");
    return <div />;
  
}

export default MuraStyles;
