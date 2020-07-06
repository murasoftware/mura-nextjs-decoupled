import React from 'react';

// eslint-disable-next-line
import { getComponent } from 'helpers/ComponentRegister';
import MuraDecorator from '../MuraDecorator';

function Container(props) {
  const { items } = props;
  // console.log('Container -> items', items);
  // console.log('Container -> props', props);
  if (!items) return '';

  return items.map(item => {
    const obj = Object.assign({}, item);
    obj.key = obj.instanceid;
    return <MuraDecorator {...obj}> {getComponent(obj)} </MuraDecorator>;
  });
}

export default Container;
