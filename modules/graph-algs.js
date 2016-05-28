function Graphs() {};

Graphs.isVertexCover = function(g, vertices) {
  var vmap;
  vmap = g.vertexMap();
  for (var v in vertices) {
	if (vmap[v]) {
      for (var x in vmap[v].edges) {
    	if (vmap[x]) delete vmap[x];
      }
      delete vmap[v];
	}
  }
  return Object.keys(vmap).length === 0;
};
