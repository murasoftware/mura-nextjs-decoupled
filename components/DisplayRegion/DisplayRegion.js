import React, {Fragment} from 'react'
import Image from '../Image'

const DisplayRegion = ({children, content}) => {
    return <Fragment>  {content.map((item) => {
        switch (item.objectname) {
        case "Image":
            return <Image key={item.instanceid} {...item} />
        default:
            return <p key={item.instanceid}>DisplayRegion: {item.objectname}</p>
        }
    })} </Fragment>
}

export default DisplayRegion;

