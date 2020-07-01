import MuraDecorator from '../MuraDecorator';
import { getComponent } from '../../helpers/ComponentRegister';

function Container(props) {
  const { items  } = props;
  // console.log('Container -> items', items);
  // console.log('Container -> props', props);
  if(!items) return ('');

  return (items.map(item => {
          let obj=Object.assign({},item);
          obj.key=obj.instanceid;
          return  (<MuraDecorator {...obj}> {getComponent(obj)} </MuraDecorator>)
      })
   
  );
}

export default Container;
