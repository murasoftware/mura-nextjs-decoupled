import MuraDecorator from '../MuraDecorator';
import { getComponent } from '../../helpers/ComponentRegister';

function Container(props) {
  const { label, items } = props;
// console.log('Container -> items', items);
// console.log('Container -> props', props);

  return (
    <MuraDecorator {...props}>
      {items &&
        items.map(item => {
          return getComponent(item);
        })}
    </MuraDecorator>
  );
}

export default Container;
