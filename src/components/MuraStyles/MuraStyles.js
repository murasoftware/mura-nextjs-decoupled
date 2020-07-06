import React from 'react';

function MuraStyles(props) {
  const { moduleStyleData } = props;

  // console.log("DIN: ",dynamicCSS);

  if (typeof moduleStyleData !== 'undefined') {
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
