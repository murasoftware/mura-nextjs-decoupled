
import React from 'react';

function Example(props) {
  // console.log("Component -> Text: ", props);

  return (
    <div>
        <h3>{props.myvar || 'Enter example variable in configurator'}</h3>
    </div>
  );
}

export default Example;
