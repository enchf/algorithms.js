Graph.test = {};
Graph.test.testSuite = new Tests().remote('data/graphs.json');
Graph.test.load = function(graph) {
  var g = new Graph();
  var edge;
  for (var i = 0; i < graph.vertices.length; i++) {
    g.addVertex(graph.vertices[i]);
  }
  for (var i = 0; i < graph.edges.length; i++) {
    edge = graph.edges[i].split(',');
    g.addEdge(edge[0],edge[1]);
  }
  return g;
};

Graph.test.vertexSet = function(assert, json) {
  console.log("vdsad");
  var g = Graph.test.load(json.graphs[0]);
  assert.deepEqual(Object.keys(g.vertices),['a','b','c','d','e','f','g','h','i']);
};

QUnit.test("Test vertex set", Graph.test.testSuite.test(Graph.test.vertexSet));
