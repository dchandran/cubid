class PartsView extends React.Component {
  static propTypes() {
    return {
      polygon: React.PropTypes.string.isRequired,
      fillColor: React.PropTypes.string.isRequired,
      strokeColor: React.PropTypes.string.isRequired,
      strokeWidth: React.PropTypes.number.isRequired,
    }
  }

  render() {
    var divStyle = {
      draggable: 'true',
      width: '10vw',
      height: '10vh',
      background: 'black'
    };
    var svgStyle = {
      fill: 'lime',
      stroke: 'purple',
      strokeWidth: 1
    };
    return (
      <div style={divStyle} class="resizable">
        <svg width="100%" height="100%" viewBox="0 0 20 10">
          <polygon points="0,10 20,10 10,0" style={svgStyle} />
        </svg>
      </div>
    );
  }
}
