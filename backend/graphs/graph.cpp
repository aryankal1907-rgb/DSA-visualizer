#include "graph.h"
#include <iostream>
#include <queue>

using namespace std;

Graph::Graph(int v, bool matrix) {
    vertices = v;
    useMatrix = matrix;

    if (useMatrix)
        adjMatrix.resize(vertices, vector<int>(vertices, 0));
    else
        adjList.resize(vertices);
}

void Graph::addVertex() {
    vertices++;

    if (useMatrix) {
        for (auto& row : adjMatrix)
            row.push_back(0);

        adjMatrix.push_back(vector<int>(vertices, 0));
    } else {
        adjList.push_back(list<int>());
    }
}

void Graph::addEdge(int u, int v) {
    if (u < 0 || v < 0 || u >= vertices || v >= vertices || u == v)
        return;

    if (useMatrix) {
        adjMatrix[u][v] = 1;
        adjMatrix[v][u] = 1;
    } else {
        if (!areAdjacent(u, v)) {
            adjList[u].push_back(v);
            adjList[v].push_back(u);
        }
    }
}

void Graph::removeEdge(int u, int v) {
    if (u < 0 || v < 0 || u >= vertices || v >= vertices)
        return;

    if (useMatrix) {
        adjMatrix[u][v] = 0;
        adjMatrix[v][u] = 0;
    } else {
        adjList[u].remove(v);
        adjList[v].remove(u);
    }
}

void Graph::removeVertex(int v) {
    if (v < 0 || v >= vertices)
        return;

    if (useMatrix) {
        adjMatrix.erase(adjMatrix.begin() + v);

        for (auto& row : adjMatrix)
            row.erase(row.begin() + v);
    } else {
        for (auto& neighbours : adjList)
            neighbours.remove(v);

        adjList.erase(adjList.begin() + v);

        for (auto& neighbours : adjList) {
            for (int& node : neighbours) {
                if (node > v)
                    node--;
            }
        }
    }

    vertices--;
}

void Graph::display() {
    if (useMatrix)
        displayMatrix();
    else
        displayList();
}

void Graph::displayList() {
    for (int i = 0; i < vertices; i++) {
        cout << i << " -> ";

        for (int node : adjList[i])
            cout << node << " ";

        cout << endl;
    }
}

void Graph::displayMatrix() {
    for (int i = 0; i < vertices; i++) {
        for (int j = 0; j < vertices; j++)
            cout << adjMatrix[i][j] << " ";

        cout << endl;
    }
}

bool Graph::areAdjacent(int u, int v) {
    if (u < 0 || v < 0 || u >= vertices || v >= vertices)
        return false;

    if (useMatrix)
        return adjMatrix[u][v] == 1;

    for (int node : adjList[u]) {
        if (node == v)
            return true;
    }

    return false;
}

int Graph::degree(int v) {
    if (v < 0 || v >= vertices)
        return -1;

    if (useMatrix) {
        int count = 0;

        for (int j = 0; j < vertices; j++)
            count += adjMatrix[v][j];

        return count;
    }

    return adjList[v].size();
}

void Graph::BFS(int start) {
    if (start < 0 || start >= vertices)
        return;

    vector<bool> visited(vertices, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int current = q.front();
        q.pop();

        cout << current << " ";

        for (int node = 0; node < vertices; node++) {
            bool connected = useMatrix
                ? adjMatrix[current][node] == 1
                : areAdjacent(current, node);

            if (connected && !visited[node]) {
                visited[node] = true;
                q.push(node);
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

    for (int node = 0; node < vertices; node++) {
        bool connected = useMatrix
            ? adjMatrix[v][node] == 1
            : areAdjacent(v, node);

        if (connected && !visited[node])
            DFSUtil(node, visited);
    }
}