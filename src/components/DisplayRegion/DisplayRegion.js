import {getComponent} from '../../helpers/ComponentRegister'

const DisplayRegion = ({children, modules}) => {
 //   console.log("DisplayRegion -> content", content);


    return <div className="mura-region" data-regionid="">  {modules.map((item) => {
        return getComponent(item)
    })} </div>
}

export default DisplayRegion;

        