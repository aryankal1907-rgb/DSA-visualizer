#ifndef BST_H
#define BST_H

struct Node {
    int data;
    Node* left;
    Node* right;
};

Node* createNode(int value);
Node* insert(Node* root, int value);
Node* deleteNode(Node* root, int value);
bool search(Node* root, int value);

int countNodes(Node* root);
int countLeafNodes(Node* root);

void inorder(Node* root);
void preorder(Node* root);
void postorder(Node* root);
void display(Node* root, int level = 0);

int height(Node* root);
Node* findMin(Node* root);
Node* findMax(Node* root);

Node* updateValue(Node* root, int oldValue, int newValue);

void mirrorTree(Node* root);

#endif