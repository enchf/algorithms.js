function Vertex(value) {
  this.label = value;
  this.weight = 0;
  this.edges = {};
  this.data = null;
}

Vertex.prototype.connect = function(vertex) {
  this.edges[vertex.label] = vertex;
};

function Graph() {
  this.vertices = {};
}

Graph.prototype.addVertex = function(values) {
  var graph = this;
  values = Array.isArray(values) ? values : [values];
  values.forEach(function(val, i, arr) {
	val = val.toString();
	graph.vertices[val] = new Vertex(val); 
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

Graph.prototype.toVertex = function(vertexValue) {
  return this.vertices[vertexValue.toString()];
};

Graph.prototype.isConnected = function(a,b) {
  a = this.toVertex(a);
  b = this.toVertex(b);
  return a && b && a.edges[b.label] && b.edges[a.label];
};

Graph.prototype.edgesOf = function(vertex) {
  var arr = null;
  vertex = this.toVertex(vertex);
  if (vertex) {
	arr = [];
	for (var x in vertex.edges) arr.push(x);
  }
  return arr;
};

Graph.prototype.vertexMap = function() {
  var map = {};
  for (var v in this.vertices) {
	map[v] = this.vertices[v];
  }
  return map;
};

Graph.prototype.edgeMatrix = function() {
  var matrix = {};
  for (var v in this.vertices) {
    matrix[v] = {};
    for (var e in this.vertices[v].edges) {
      matrix[v][e] = true;
    }
  }
  return matrix;
};
