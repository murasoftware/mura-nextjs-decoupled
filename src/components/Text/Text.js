import MuraDecorator from '../MuraDecorator';
import React from 'react';

function Text(props) {
  //console.log("Component -> Text: ", props);

  return (
    <MuraDecorator {...props}>
      <div className="mura-object-meta-wrapper">
        <div className="mura-object-meta">
        <div dangerouslySetInnerHTML={{__html: props.source}}></div>
          {/* <MarkdownModule>{props.source}</MarkdownModule> */}
        </div>
      </div>
    </MuraDecorator>
  );
}

export default Text;
