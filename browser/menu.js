const BurgerMenu = require('react-burger-menu').slide;
const Dropzone = require('react-dropzone');

require('./images/open_file.png');
require('./images/map.png');
require('./images/movie.png');
require('./images/python.png');
require('./styles/menu.css');

class Menu extends React.Component {
  render() {
    let menuStyles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '2em',
        height: '2em',
        left: '1em',
        top: '1em'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '1em',
        width: '1em'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '0 0 0',
        fontSize: '1.30em'
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '1.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.2)'
      }
    }

    let menuItems = [
      {
        class: 'mapButton',
        tooltip: 'Overall concept design'
      },
      {
        class: 'animationButton',
        tooltip: 'Animate the simulated results'
      },
      {
        class: 'pythonButton',
        tooltip: 'Simulate using Python code'
      }
    ];

    let myFunc = () => {
      debugger;
    };

    let onDrop = (files) => {
      debugger;
    };

    let dropZoneStyles = {
      width: "2em",
      height: "2em"
    };

    return (<BurgerMenu styles={menuStyles} width={150}>
        <div className="tooltip" data-hint="Open a project file">
          <Dropzone className="menuButton fileOpenButton" onDrop={onDrop}/>
        </div>
        {
          menuItems.map(function(item) {
            let classNames = "menuButton tooltip " + item.class;
            return (
              <div className="tooltip" data-hint={item.tooltip}>
              <input type="button" onClick={myFunc} className={classNames}/>
              </div>);
          })
        }
    </BurgerMenu>);
  }
}

export default Menu;
