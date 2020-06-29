import Mura from 'mura.js'
import Example from './components/Example'

//This module is also registered with Mura via the ./static/mura.config.json
Mura.Module.Example=Mura.UI.React.extend({
	component:Example
});

