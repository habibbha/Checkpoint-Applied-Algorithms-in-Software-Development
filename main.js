
// Define a graph class
class Graph {
    constructor() {
      this.vertices = {};
    }
  
    addVertex(name, edges) {
      this.vertices[name] = edges;
    }
  
    dijkstra(startVertex) {
      let distances = {};
      let visited = {};
      let queue = new PriorityQueue();
  
      // Initialize distances and add start vertex to the queue
      for (let vertex in this.vertices) {
        distances[vertex] = vertex === startVertex ? 0 : Infinity;
        queue.enqueue(vertex, distances[vertex]);
      }
  
      while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue().data;
        visited[currentVertex] = true;
  
        // Explore neighbors of the current vertex
        for (let neighbor in this.vertices[currentVertex]) {
          const distance = this.vertices[currentVertex][neighbor];
          const newDistance = distances[currentVertex] + distance;
  
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            queue.enqueue(neighbor, newDistance);
          }
        }
      }
  
      return distances;
    }
  }
  
  // Priority queue implementation
  class PriorityQueue {
    constructor() {
      this.items = [];
    }
  
    enqueue(data, priority) {
      this.items.push({ data, priority });
      this.sort();
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    sort() {
      this.items.sort((a, b) => a.priority - b.priority);
    }
  }
  
  // Example usage
  const graph = new Graph();
  graph.addVertex('A', { B: 4, C: 2 });
  graph.addVertex('B', { A: 4, C: 5, D: 10 });
  graph.addVertex('C', { A: 2, B: 5, D: 3 });
  graph.addVertex('D', { B: 10, C: 3 });
  
  const distances = graph.dijkstra('A');
  console.log(distances); // Output: { A: 0, B: 4, C: 2, D: 5 }