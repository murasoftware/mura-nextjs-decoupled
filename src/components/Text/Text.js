import MuraDecorator from '../MuraDecorator';
import React from 'react';

function Text(props) {
  //console.log("Component -> Text: ", props);

  return (
    <MuraDecorator {...props}>
        <div dangerouslySetInnerHTML={{__html: props.source}}></div>
          {/* <MarkdownModule>{props.source}</MarkdownModule> */}
    </MuraDecorator>
  );
}

export default Text;
