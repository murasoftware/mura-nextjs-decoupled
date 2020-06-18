import MuraDecorator from '../MuraDecorator';
import { getComponent } from '../../helpers/ComponentRegister';

function Container(props) {
  const { label, items } = props;
  console.log('Container -> items', items);
  console.log('Container -> props', props);

  return (
    <div className="mura-region-local">
      <MuraDecorator {...props}>
        <div className="mura-object-meta-wrapper">
          <div className="mura-object-meta">
            <h2>{label}</h2>
          </div>
        </div>
        <div className="mura-flex-break"></div>
        <div className="mura-object-content">
          {items &&
            items.map(item => {
              return getComponent(item);
            })}
        </div>
      </MuraDecorator>
    </div>
  );
}

export default Container;
