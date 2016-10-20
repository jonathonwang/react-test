// ------------------------------------------------------------
// Weird Thing I dont wanna do but is necessary with TypeScript (As far as I know)
// assigns the imported jQuery object as jQuery && $ on window.
import * as jQuery from 'jquery';
Object.assign(Window.prototype, {
  jQuery,
  $: jQuery
});
import 'bootstrap';
// End Weird Bootstrap jQuery Stuff
// ------------------------------------------------------------


import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './components/Hello';

ReactDOM.render(
    <Hello compiler='TypeScript' framework='React' />,
    document.getElementById('example')
);
