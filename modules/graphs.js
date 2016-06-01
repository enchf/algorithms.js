/**
 * Abstraction of a graph vertex.
 * Value is converted to String as the vertex label.
 * Weight is initialized to 1.
 * Edges is defined as a map to optimize edge access.
 * An extra data object is set to use miscellaneously in algorithms (i.e. Graph coloring).
 */
function Vertex(value) {
  this.label = value.toString();
  this.value = value;
  this.weight = 1;
  this.edges = {};
  this.data = null;
}

/**
 * Adds the reference of another vertex, to create an edge.
 */
Vertex.prototype.connect = function(vertex) {
  this.edges[vertex.label] = vertex;
};


/**
 * Graph abstraction.
 * Mantains a dictionary of vertices.
 */
function Graph() {
  this.vertices = {};
}

Graph.prototype.addVertex = function(vertex) {
  var v = new Vertex(vertex);
  this.vertices[vertex.label] = vertex;
};

Graph.prototype.addVertices = function(vertices) {
  var graph = this;
  vertices.forEach(function(val) { graph.addVertex(val); });
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
