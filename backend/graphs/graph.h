#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include <list>

using namespace std;

class Graph {
private:
    int vertices;
    bool useMatrix;
    vector<list<int>> adjList;
    vector<vector<int>> adjMatrix;

public:
    Graph(int v, bool matrix = false);

    void addVertex();
    void addEdge(int u, int v);
    void removeVertex(int v);
    void removeEdge(int u, int v);

    void display();
    void displayMatrix();
    void displayList();

    bool areAdjacent(int u, int v);
    int degree(int v);

    void BFS(int start);
    void DFS(int start);

private:
    void DFSUtil(int v, vector<bool>& visited);
};

#endif