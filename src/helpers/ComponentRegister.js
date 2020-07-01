import Image from '../components/Image';
import Container from '../components/Container';
import Example from '../components/Example';
import Video from '../components/Video';
import Text from '../components/Text';
import Mura from 'mura.js';

const getComponent = (item) => {
  let Component;
  const objectkey=Mura.firstToUpperCase(item.object);
  
  switch (objectkey) {
    case 'Image':
      Component = <Image key={item.instanceid} {...item} />;
      break;
    case 'Container':
      Component = <Container key={item.instanceid} {...item} />;
      break;
    case 'Example':
      Component = <Example key={item.instanceid} {...item} />;
      break;
    case 'Video':
      Component = <Video key={item.instanceid} {...item} />;
      break;
    case 'Text':
      Component = <Text key={item.instanceid} {...item} />;
      break;
    default:
      Component = <p key={item.instanceid}>DisplayRegion: {item.objectname}</p>;
      break;
  }
  return Component;
};

export { getComponent };
