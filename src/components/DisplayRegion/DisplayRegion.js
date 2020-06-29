import {getComponent} from '../../helpers/ComponentRegister'

const DisplayRegion = ({children, modules}) => {
 //   console.log("DisplayRegion -> content", content);


    return <div className="mura-region" data-regionid="">
        <div className="mura-region-local">
                  {modules.map((item) => {
        return getComponent(item)
    })} 
        </div>
    </div>
}

export default DisplayRegion;

        