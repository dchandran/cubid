const React = require('react');
const ReactDOM = require('react-dom');
const StyleSheet = require('react-style')
const SplitPane = require('react-split-pane');
const PartsView = require('./PartsView');
const NetworkView = require('./NetworkView');
const Menu = require('./menu');

import './main.css'

window.onload = () => {
  var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
  $('#root').w2layout({
      name: 'layout',
      panels: [
          { type: 'top', size: 50, resizable: true, hidden: true, style: pstyle, content: 'top' },
          { type: 'left', size: 200, resizable: true, hidden: true, style: pstyle, content: 'left' },
          { type: 'main', style: 'background-color: white;', overflow: 'hidden' },
          { type: 'preview', size: '50%', resizable: true, hidden: false, style: pstyle, content: 'preview' },
          { type: 'right', size: 200, resizable: true, hidden: true, style: pstyle, content: 'right' },
          { type: 'bottom', size: 50, resizable: true, hidden: true, style: pstyle, content: 'bottom' }
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

  w2ui['layout'].content('main', document.getElementById('root2'));
  let menuStyle = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
  ReactDOM.render(
      <Menu/>
    ,
    document.getElementById('root2')
  );
};
