#ifndef GRAPH_H
#define GRAPH_H

#include <vector>
#include <list>

using namespace std;

class Graph {
private:
    int vertices;
    vector<list<int>> adj;

public:
    Graph(int v);

    void addVertex();
    void addEdge(int u, int v);
    void removeVertex(int v);
    void removeEdge(int u, int v);

    void display();
    bool areAdjacent(int u, int v);
    int degree(int v);

    void BFS(int start);
    void DFS(int start);

private:
    void DFSUtil(int v, vector<bool>& visited);
};

#endif