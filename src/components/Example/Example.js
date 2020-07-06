
import React from 'react';

function Example({myvar}) {
  // console.log("Component -> Text: ", props);

  return (
    <div>
        <h3>{myvar || 'Enter example variable in configurator'}</h3>
    </div>
  );
}

export default Example;
