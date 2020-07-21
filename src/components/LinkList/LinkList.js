import React from 'react';
import Container from '@components/Container';

const LinkList = (props) => {
  return (
    <div>
      Hello World

      Start Container
      <Container {...props} />
      End container
    </div>
  );
};

export default LinkList;
