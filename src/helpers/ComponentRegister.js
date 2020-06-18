import Image from '../components/Image';
import Container from '../components/Container';
import Video from '../components/Video';
import Text from '../components/Text';

const getComponent = item => {
  let Component;
  switch (item.objectname) {
    case 'Image':
      Component = <Image key={item.instanceid} {...item} />;
      break;
    case 'Container':
      Component = <Container key={item.instanceid} {...item} />;
      break;
    case '':
      if (item.videoid) {
        Component = <Video key={item.instanceid} {...item} />;
        break;
      }
      Component = <p key={item.instanceid}>DisplayRegion: {item.objectname}</p>;
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
