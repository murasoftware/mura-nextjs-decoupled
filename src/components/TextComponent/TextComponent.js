import MuraDecorator from '../MuraDecorator';
import React from 'react';

function TextComponent(props) {
  console.log("Component -> TextComponent: ", props);

  return (
    <MuraDecorator {...props}>
      <div className="mura-object-meta-wrapper">
        <div className="mura-object-meta">
          Component ID: 
        <div dangerouslySetInnerHTML={{__html: props.source}}></div>
          {/* <MarkdownModule>{props.source}</MarkdownModule> */}
        </div>
      </div>
    </MuraDecorator>
  );
}

export default TextComponent;
