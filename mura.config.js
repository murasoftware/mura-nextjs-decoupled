import Mura from 'mura.js'
import Example from './src/components/Example'
import Text from './src/components/Text'
import Video from './src/components/Video'
import Image from './src/components/Image'
//import Container from './src/components/Container'

require('mura.js/src/core/ui.react');

//This module is also registered with Mura via the ./static/mura.config.json
Mura.Module.Example=Mura.UI.React.extend({
	component:Example
});


Mura.Module.Text=Mura.UI.React.extend({
	component:Text
});

Mura.Module.Video=Mura.UI.React.extend({
	component:Video
});

Mura.Module.Image=Mura.UI.React.extend({
	component:Image
});

/*
Mura.Module.Container=Mura.UI.React.extend({
	component:Container
});
*/


