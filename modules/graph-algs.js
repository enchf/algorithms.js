function Graphs() {};

Graphs.isVertexCover = function(g, vertices) {
  var edges;
  var v;
  edges = g.edgeMatrix();
  for (var i = 0; i < vertices.length; i++) {
    v = vertices[i];
    if (edges[v]) {
      for (var e in g.vertices[v].edges) {
        if (edges[v]) {
          if (edges[v][e]) delete edges[v][e];
          if (Object.keys(edges[v]).length === 0) delete edges[v];
        }
        if (edges[e]) {
          if (edges[e][v]) delete edges[e][v];
          if (Object.keys(edges[e]).length === 0) delete edges[e];
        }
      }
    }
  }
  return Object.keys(edges).length === 0;
};
