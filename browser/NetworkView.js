const d3Network = {

  create: function(el, state) {
    const width = el.clientWidth;
    const height = el.clientHeight;
    const self = this;

    self.svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width', width)
        .attr('height', height);

        // Lasso functions to execute while lassoing
    var lasso_start = function() {
      self.lasso.items()
        .attr("r",3.5) // reset size
        .style("fill",null) // clear all of the fills
        .classed({"not_possible":true,"selected":false}); // style as not possible
    };

    var lasso_draw = function() {
      // Style the possible dots
      self.lasso.items().filter(function(d) {return d.possible===true})
        .classed({"not_possible":false,"possible":true});

      // Style the not possible dot
      self.lasso.items().filter(function(d) {return d.possible===false})
        .classed({"not_possible":true,"possible":false});
    };

    const color = d3.scale.category10();

    var lasso_end = function() {
      // Reset the color of all dots
      self.lasso.items()
         .style("fill", function(d) { return color(d.species); });

      // Style the selected dots
      self.lasso.items().filter(function(d) {return d.selected===true})
        .classed({"not_possible":false,"possible":false})
        .attr("r",7);

      // Reset the style of the not selected dots
      self.lasso.items().filter(function(d) {return d.selected===false})
        .classed({"not_possible":false,"possible":false})
        .attr("r",3.5);

    };

    // Create the area where the lasso event can be triggered
    var lasso_area = self.svg.append("rect")
                          .attr("width",width)
                          .attr("height",height)
                          .style("opacity",0);

    // Define the lasso
    self.lasso = d3.lasso()
          .closePathDistance(75) // max distance for the lasso loop to be closed
          .closePathSelect(true) // can items be selected by closing the path?
          .hoverSelect(true) // can items by selected by hovering over them?
          .area(lasso_area) // area where the lasso can be started
          .on("start",lasso_start) // lasso start function
          .on("draw",lasso_draw) // lasso draw function
          .on("end",lasso_end); // lasso end function

    // Init the lasso on the svg:g that contains the dots
    self.svg.call(self.lasso);

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

    const color = d3.scale.category20();

    var d3cola = cola.d3adaptor()
        .linkDistance(120)
        .avoidOverlaps(true)
        .size([width, height]);

    var svg = this.svg;
    var lasso = this.lasso;

    d3.json("alignmentconstraints.json", function (error, graph) {
        graph.nodes.forEach(function (v) { v.x = 10, v.y = 10 });
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

        lasso.items(d3.selectAll(".node"));

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
