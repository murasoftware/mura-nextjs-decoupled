import {getComponent} from '../../helpers/ComponentRegister'
import MuraDecorator from '../MuraDecorator';


/*
	function buildRegionSectionHeader(section,name,perm,regionid){
		if(name){ 
			if(section=='inherited'){
				return "<div class=\"mura-region-inherited\"><div class=\"frontEndToolsModal mura\"><span class=\"mura-edit-label mi-lock\">" +  escapeHTML(name.toUpperCase()) + ": Inherited</span></div>";
			} else {
				return "<div class=\"mura-editable mura-inactive\"><div class=\"mura-region-local mura-inactive mura-editable-attribute\" data-loose=\"false\" data-regionid=\"" + escapeHTML(regionid) + "\" data-inited=\"false\" data-perm=\"" + escapeHTML(perm) + "\"><label class=\"mura-editable-label\" style=\"display:none\">" +  escapeHTML(name.toUpperCase()) + "</label>";
			}
		} else {
			return "<div class=\"mura-region-" + escapeHTML(section) + "\">";	
		}
	}
*/

const DisplayRegionSection = ({children,region,section}) => {
    if(section=='inherited' && !region.inherited.items.length){
        return (
            <div className="mura-region-inherited">
                <div class="frontEndToolsModal mura">
                    <span class="mura-edit-label mi-lock">{region.name.toUpperCase()}: Inherited</span>
                </div>
                    {children}
            </div>
        )
    } else if (section=='local') {
        return (<div className="mura-editable mura-inactive">
        <div className="mura-region-local mura-inactive mura-editable-attribute" data-loose="false" data-regionid={region.regionid} data-inited="false" data-perm="true">
            <label className="mura-editable-label" style={{display:"none"}}>
                {region.name.toUpperCase()}
            </label>
            {children}
            </div>
        </div>)
    } else {
        return '';
    }
}

const DisplayRegion = ({region}) => {
    //   console.log("DisplayRegion -> content", content);
    let inherited='';
    if(region.inherited.items.length){
        inherited=(<DisplayRegionSection region={region} section="inherited">
        {region.inherited.items.map((item) => {
            let obj=Object.assign({},item);
            obj.key=obj.instanceid;
            return  <MuraDecorator {...obj}>
                {getComponent(obj)}
            </MuraDecorator>
        })}
        </DisplayRegionSection>)
    }
   
    return (<div className="mura-region" data-regionid={region.regionid}>
        {inherited}
        <DisplayRegionSection region={region} section="local">
        {region.local.items.map((item) => {
            let obj=Object.assign({},item);
            obj.key=obj.instanceid;
            return  <MuraDecorator {...obj}>
                {getComponent(obj)}
                </MuraDecorator>
        })} 
        </DisplayRegionSection>
    </div>)
}

export default DisplayRegion;

        