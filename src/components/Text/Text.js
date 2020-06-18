import MuraDecorator from '../MuraDecorator';
import React from 'react';

function HeadingText({ element, value }) {
  const HeadingEl = element;
  return <HeadingEl>{value}</HeadingEl>;
}

function Text(props) {
  const { label, labeltag } = props;

  return (
    <MuraDecorator {...props}>
      <div className="mura-object-meta-wrapper">
        <div className="mura-object-meta">
          <HeadingText element={labeltag} value={label} />
        </div>
      </div>
    </MuraDecorator>
  );
}

export default Text;
