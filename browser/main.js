const React = require('react');
const ReactDOM = require('react-dom');
const SplitPane = require('react-split-pane');
import './main.css'

const d3Network = {

  create: function(el, state) {
    const width = el.clientWidth;
    const height = el.clientHeight;

    this.svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width', width)
        .attr('height', height);

    this.update(el, state);
  },

  getAlignmentBounds: function(vs, c) {
      var os = c.offsets;
      if (c.axis === 'x') {
          var x = vs[os[0].node].x;
          c.bounds = new cola.vpsc.Rectangle(x, x,
              Math.min.apply(Math, os.map(function (o) { return vs[o.node].bounds.y - 20; })),
              Math.max.apply(Math, os.map(function (o) { return vs[o.node].bounds.Y + 20; })));
      } else {
          var y = vs[os[0].node].y;
          c.bounds = new cola.vpsc.Rectangle(
              Math.min.apply(Math, os.map(function (o) { return vs[o.node].bounds.x - 20; })),
              Math.max.apply(Math, os.map(function (o) { return vs[o.node].bounds.X + 20; })),
              y, y);
      }
      return c.bounds;
  },

  update: function(el, state) {
    const self = this;

    var width = el.clientWidth,
        height = el.clientHeight;

    var color = d3.scale.category20();

    var d3cola = cola.d3adaptor()
        .linkDistance(120)
        .avoidOverlaps(true)
        .size([width, height]);

    var svg = this.svg;

    d3.json("alignmentconstraints.json", function (error, graph) {
        graph.nodes.forEach(function (v) { v.x = 400, v.y = 50 });
        d3cola
            .nodes(graph.nodes)
            .links(graph.links)
            .constraints(graph.constraints)
            .start(10,10,10);

        var link = svg.selectAll(".link")
            .data(graph.links)
          .enter().append("line")
            .attr("class", "link");

        var guideline = svg.selectAll(".guideline")
            .data(graph.constraints.filter(function (c) { return c.type === 'alignment' }))
          .enter().append("line")
            .attr("class", "guideline")
            .attr("stroke-dasharray", "5,5");

        var node = svg.selectAll(".node")
            .data(graph.nodes)
          .enter().append("rect")
            .attr("class", "node")
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .attr("rx", 5).attr("ry", 5)
            .style("fill", function (d) { return color(1); })
            .call(d3cola.drag);

        var label = svg.selectAll(".label")
            .data(graph.nodes)
           .enter().append("text")
            .attr("class", "label")
            .text(function (d) { return d.name; })
            .call(d3cola.drag);

        node.append("title")
            .text(function (d) { return d.name; });

        d3cola.on("tick", function () {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            guideline
                .attr("x1", function (d) { return self.getAlignmentBounds(graph.nodes, d).x; })
                .attr("y1", function (d) {
                    return d.bounds.y;
                })
                .attr("x2", function (d) { return d.bounds.X; })
                .attr("y2", function (d) {
                    return d.bounds.Y;
                });

            node.attr("x", function (d) { return d.x - d.width / 2; })
                .attr("y", function (d) { return d.y - d.height / 2; });

            label.attr("x", function (d) { return d.x; })
                 .attr("y", function (d) {
                     var h = this.getBBox().height;
                     return d.y + h/4;
                 });
        });
    });
  },

  destroy: function(el) {
    //placeholder
  },
};


class NetworkView extends React.Component {
  static propTypes() {
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    d3Network.create(el, this.getNetworkState());
  }

  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);
    d3Network.update(el, this.getNetworkState());
  }

  getNetworkState() {
    return {
    };
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this);
    d3Network.destroy(el);
  }

  render() {
    var divStyle = {
      width: '100vw',
      height: '100vh',
    };
    return (
      <div className="NetworkView" style={divStyle}></div>
    );
  }
}

window.onload = () => {
  ReactDOM.render(
    <SplitPane split="vertical" minSize="50">
        <div></div>
        <SplitPane split="horizontal">
            <NetworkView name="World" />
            <div></div>
        </SplitPane>
    </SplitPane>,
    document.getElementById('root')
  );
};
