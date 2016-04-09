const BurgerMenu = require('react-burger-menu').slide;
require('./images/movie.png');
require('./images/python.png');
require('./styles/menu.css');

class Menu extends React.Component {
  render() {
    let styles = {
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

    let myFunc = () => {
      debugger;
    };

    return (<BurgerMenu styles={styles} width={150}>
      <div className="tooltip" data-hint="HELLO">
      <input type="button" onClick={myFunc} className="menuButton animationButton"/>
      </div>
      <input type="button" onClick={myFunc} className="menuButton pythonButton tooltip"/>
    </BurgerMenu>);
  }
}

export default Menu;
