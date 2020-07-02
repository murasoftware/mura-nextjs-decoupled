import React from 'react';

function Text(props) {
  // console.log("Component -> Text: ", props);

  return (
      <div dangerouslySetInnerHTML={{__html: props.source}} />
  );
}

export default Text;
