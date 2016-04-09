const React = require('react');
const ReactDOM = require('react-dom');
const SplitPane = require('react-split-pane');
const PartsView = require('./PartsView');
const NetworkView = require('./NetworkView');
import Menu from './menu';

window.onload = () => {
  var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
  $('#root2').w2layout({
      name: 'layout',
      panels: [
          { type: 'top', size: 0, resizable: true, hidden: true, style: pstyle, content: 'top' },
          { type: 'left', size: 0, resizable: true, hidden: true, style: pstyle, content: 'left' },
          { type: 'main', style: 'background-color: none;', overflow: 'hidden' },
          { type: 'preview', size: '50%', resizable: true, hidden: true, style: pstyle},
          { type: 'right', size: 0, resizable: true, hidden: true, style: pstyle, content: 'right' },
          { type: 'bottom', size: '50%', resizable: true, hidden: false},
      ]
  });
/*  var pstyle = 'background-color: #F0F0C1; border: 1px solid #dfdfdf; padding: 5px;';
  $().w2layout({
      name: 'layout2',
      panels: [
          { type: 'top', size: 40, resizable: true, style: pstyle, content: 'top' },
          { type: 'left', size: 80, resizable: true, style: pstyle, content: 'left' },
          { type: 'main', style: pstyle },
          { type: 'preview', size: '50%', resizable: true, hidden: true, style: pstyle, content: 'preview' },
          { type: 'right', size: 80, resizable: true, style: pstyle, content: 'right' },
          { type: 'bottom', size: 40, resizable: true, hidden: true, style: pstyle, content: 'bottom' }
      ]
  });*/

  w2ui['layout'].content('main', document.getElementById('firstDiv'));
  w2ui['layout'].content('bottom', document.getElementById('secondDiv'));
  ReactDOM.render(<Menu/>,document.getElementById('root1'));
};
