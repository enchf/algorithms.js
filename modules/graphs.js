function Graph() {
  this.vertex = {};
}

function Vertex(value) {
  this.label = value;
  this.weight = 0;
  this.edges = {};
  this.data = null;
}

Graph.prototype.addVertex = function(values) {
  var graph = this;
  
  values = Array.isArray(values) || [values];
  values.forEach(function(val, i, arr) {
	val = val.toString();
	graph.vertex[val] = new Vertex(val); 
  });
};

Graph.prototype.addEdge = function(a,b) {
  a = this.toVertex(a);
  b = this.toVertex(b);
  if (a && b) {
	a.connect(b);
	b.connect(a);
  }
};

Vertex.prototype.connect = function(vertex) {
  this.edges[vertex.label] = vertex;
};

Graph.prototype.toVertex = function(vertexValue) {
  return this.vertex[vertexValue.toString()];
};

Graph.prototype.isConnected = function(a,b) {
  a = this.toVertex(a);
  b = this.toVertex(b);
  return a && b && a.edges(b.label) && b.edges(a.label);
};
