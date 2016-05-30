Graphs.test = {};

Graphs.test.vertexCover = function(assert, json) {
  var g = Graph.test.load(json.graphs[0]);
  var set = json.graphs[0].tests['vertex-cover'];
  
  for (var i = 0; i < set.yes.length; i++) {
    assert.ok(Graphs.isVertexCover(g, set.yes[i]), set.yes[i].join(',') + ' vertex set covers all edges');
  }
  
  for (var i = 0; i < set.no.length; i++) {
    assert.notOk(Graphs.isVertexCover(g, set.no[i]), set.no[i].join(',') + ' vertex set does not cover all edges');
  }
};

QUnit.test("Vertex cover algorithm", Graph.test.testSuite.test(Graphs.test.vertexCover));