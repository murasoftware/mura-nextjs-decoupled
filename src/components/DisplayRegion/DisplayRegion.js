import { getComponent } from '../../helpers/MuraHelper';
import MuraDecorator from '../MuraDecorator';

const DisplayRegionSection = ({ children, region, section }) => {
  if (typeof region.name !== 'undefined') {
    if (section == 'inherited' && !region.inherited.items.length) {
      return (
        <div className="mura-region-inherited">
          <div className="frontEndToolsModal mura">
            <span className="mura-edit-label mi-lock">
              {region.name.toUpperCase()}: Inherited
            </span>
          </div>
          {children}
        </div>
      );
    }
    if (section == 'local') {
      return (
        <div className="mura-editable mura-inactive">
          <div
            className="mura-region-local mura-inactive mura-editable-attribute"
            data-loose="false"
            data-regionid={region.regionid}
            data-inited="false"
            data-perm="true"
          >
            <label className="mura-editable-label" style={{ display: 'none' }}>
              {region.name.toUpperCase()}
            </label>
            {children}
          </div>
        </div>
      );
    }
  } else {
    const regionName = `mura-region-${section}`;

    return <div className={regionName}>{children}</div>;
  }
};

const DisplayRegion = ({ region }) => {
  const dynamicCSS = [];

  //   console.log("DisplayRegion -> content", content);
  let inherited = '';
  // Mura inheritance, where modules are inherited from parent content
  if (region.inherited.items.length) {
    inherited = (
      <DisplayRegionSection region={region} section="inherited">
        {region.inherited.items.map(item => {
          const obj = Object.assign({}, item);
          obj.key = obj.instanceid;
          return <MuraDecorator {...obj}>{getComponent(obj)}</MuraDecorator>;
        })}
      </DisplayRegionSection>
    );
  }

  return (
    <div className="mura-region" data-regionid={region.regionid}>
      {inherited}
      <DisplayRegionSection region={region} section="local">
        {region.local.items.map(item => {
          const obj = Object.assign({}, item);
          obj.key = obj.instanceid;
          return <MuraDecorator {...obj}>{getComponent(obj)}</MuraDecorator>;
        })}
      </DisplayRegionSection>
    </div>
  );
};

export default DisplayRegion;
