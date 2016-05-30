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

Graph.test.vertexSet = function(assert,json) {
  var g = Graph.test.load(json.graphs[0]);
  assert.deepEqual(Object.keys(g.vertices),['a','b','c','d','e','f','g','h','i'],'Vertices set for Graph 0');
};

Graph.test.edgeSet = function(assert,json) {
  var g = Graph.test.load(json.graphs[0]);
  var edge;
  
  for (var i = 0; i < json.graphs[0].edges.length; i++) {
    edge = json.graphs[0].edges[i].split(',');
    assert.ok(g.isConnected(edge[0],edge[1]),edge[0] + ' and ' + edge[1] + ' are connected in Graph 0');
    assert.ok(g.isConnected(edge[1],edge[0]),edge[1] + ' and ' + edge[0] + ' are connected in Graph 0');
  }
  
  for (var i = 0; i < json.graphs[0].tests.noedges.length; i++) {
    edge = json.graphs[0].tests.noedges[i].split(',');
    assert.notOk(g.isConnected(edge[0],edge[1]),edge[0] + ' and ' + edge[1] + ' are not connected in Graph 0');
    assert.notOk(g.isConnected(edge[1],edge[0]),edge[1] + ' and ' + edge[0] + ' are not connected in Graph 0');
  }
};

Graph.test.edgeMatrix = function(assert,json) {
  var g = Graph.test.load(json.graphs[0]);
  assert.deepEqual(json.graphs[0].tests['edge-matrix'], g.edgeMatrix(), 'Edge matrix correctly set for Graph 0');
};

QUnit.test("Test vertices are set", Graph.test.testSuite.test(Graph.test.vertexSet));
QUnit.test("Test edges are set", Graph.test.testSuite.test(Graph.test.edgeSet));
QUnit.test("Edge matrix set", Graph.test.testSuite.test(Graph.test.edgeMatrix));
