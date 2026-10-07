#include "graph.h"
#include <iostream>

using namespace std;

Graph::Graph(int v) {
    vertices = v;
    adj.resize(vertices);
}

void Graph::addVertex() {
    adj.push_back(list<int>());
    vertices++;
}

void Graph::addEdge(int u, int v) {
    if (u < 0 || v < 0 || u >= vertices || v >= vertices)
        return;

    adj[u].push_back(v);
    adj[v].push_back(u);
}

void Graph::removeEdge(int u, int v) {
    if (u < 0 || v < 0 || u >= vertices || v >= vertices)
        return;

    adj[u].remove(v);
    adj[v].remove(u);
}

void Graph::removeVertex(int v) {
    if (v < 0 || v >= vertices)
        return;

    for (int i = 0; i < vertices; i++)
        adj[i].remove(v);

    adj.erase(adj.begin() + v);

    for (int i = 0; i < vertices - 1; i++) {
        for (int& node : adj[i]) {
            if (node > v)
                node--;
        }
    }

    vertices--;
}

void Graph::display() {
    for (int i = 0; i < vertices; i++) {
        cout << i << " -> ";

        for (int node : adj[i])
            cout << node << " ";

        cout << endl;
    }
}

bool Graph::areAdjacent(int u, int v) {
    if (u < 0 || v < 0 || u >= vertices || v >= vertices)
        return false;

    for (int node : adj[u]) {
        if (node == v)
            return true;
    }

    return false;
}

int Graph::degree(int v) {
    if (v < 0 || v >= vertices)
        return -1;

    return adj[v].size();
}

void Graph::BFS(int start) {
    if (start < 0 || start >= vertices)
        return;

    vector<bool> visited(vertices, false);
    vector<int> queue;

    visited[start] = true;
    queue.push_back(start);

    int front = 0;

    while (front < queue.size()) {
        int current = queue[front++];

        cout << current << " ";

        for (int node : adj[current]) {
            if (!visited[node]) {
                visited[node] = true;
                queue.push_back(node);
            }
        }
    }
}

void Graph::DFS(int start) {
    if (start < 0 || start >= vertices)
        return;

    vector<bool> visited(vertices, false);

    DFSUtil(start, visited);
}

void Graph::DFSUtil(int v, vector<bool>& visited) {
    visited[v] = true;

    cout << v << " ";

    for (int node : adj[v]) {
        if (!visited[node])
            DFSUtil(node, visited);
    }
}