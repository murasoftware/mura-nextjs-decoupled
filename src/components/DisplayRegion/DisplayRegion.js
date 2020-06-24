import {getComponent} from '../../helpers/ComponentRegister'

const DisplayRegion = ({children, content}) => {
 //   console.log("DisplayRegion -> content", content);


    return <div className="mura-region" data-regionid="">  {content.map((item) => {
        return getComponent(item)
    })} </div>
}

export default DisplayRegion;

        