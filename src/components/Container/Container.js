import MuraDecorator from '../MuraDecorator';
import { getComponent } from '../../helpers/MuraHelper';
import Mura from 'mura.js/src/core/core';

function Container(props) {
  const { items  } = props;
  // console.log('Container -> items', items);
  // console.log('Container -> props', props);
  if(!items) return ('');

  return (items.map(item => {
          let obj=Object.assign({},item);
          if(Mura.cloning){
            obj.instanceid=Mura.createUUID();
          }
          obj.key=obj.instanceid;
          return  (<MuraDecorator {...obj}> {getComponent(obj)} </MuraDecorator>)
      })
   
  );
}

export default Container;
