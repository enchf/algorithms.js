function Graphs() {};

Graphs.isVertexCover = function(g, vertices) {
  var edges;
  edges = g.edgeMatrix();
  for (var v in vertices) {
    if (edges[v]) {
      for (var e in g.vertices[v]) {
        if (edges[v][e]) delete edges[v][e];
        if (edges[e][v]) delete edges[e][v];
        if (Object.keys(edges[v]).length === 0) delete edges[v];
        if (Object.keys(edges[e]).length === 0) delete edges[e];
      }
    }
  }
  return Object.keys(edges).length === 0;
};
