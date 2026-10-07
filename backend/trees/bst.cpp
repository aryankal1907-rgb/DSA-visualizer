#include <iostream>
#include <algorithm>
#include "bst.h"

using namespace std;

Node* createNode(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->left = nullptr;
    newNode->right = nullptr;
    return newNode;
}

Node* insert(Node* root, int value) {
    if (root == nullptr)
        return createNode(value);

    if (value < root->data)
        root->left = insert(root->left, value);
    else if (value > root->data)
        root->right = insert(root->right, value);

    return root;
}

Node* findMin(Node* root) {
    if (root == nullptr)
        return nullptr;

    if (root->left == nullptr)
        return root;

    return findMin(root->left);
}

Node* findMax(Node* root) {
    if (root == nullptr)
        return nullptr;

    if (root->right == nullptr)
        return root;

    return findMax(root->right);
}

Node* deleteNode(Node* root, int value) {
    if (root == nullptr)
        return nullptr;

    if (value < root->data)
        root->left = deleteNode(root->left, value);

    else if (value > root->data)
        root->right = deleteNode(root->right, value);

    else {

        // Case 1: Node has no child
        if (root->left == nullptr && root->right == nullptr) {
            delete root;
            return nullptr;
        }

        // Case 2: Node has one child
        if (root->left == nullptr) {
            Node* temp = root->right;
            delete root;
            return temp;
        }

        if (root->right == nullptr) {
            Node* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: Node has two children
        Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }

    return root;
}

bool search(Node* root, int value) {
    if (root == nullptr)
        return false;

    if (root->data == value)
        return true;

    if (value < root->data)
        return search(root->left, value);

    return search(root->right, value);
}

int countNodes(Node* root) {
    if (root == nullptr)
        return 0;

    return 1 + countNodes(root->left) + countNodes(root->right);
}

int countLeafNodes(Node* root) {
    if (root == nullptr)
        return 0;

    if (root->left == nullptr && root->right == nullptr)
        return 1;

    return countLeafNodes(root->left) + countLeafNodes(root->right);
}

void inorder(Node* root) {
    if (root == nullptr)
        return;

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}

void preorder(Node* root) {
    if (root == nullptr)
        return;

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}

void postorder(Node* root) {
    if (root == nullptr)
        return;

    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}

void display(Node* root, int level) {
    if (root == nullptr)
        return;

    display(root->right, level + 1);

    for (int i = 0; i < level; i++)
        cout << "    ";

    cout << root->data << endl;

    display(root->left, level + 1);
}

int height(Node* root) {
    if (root == nullptr)
        return -1;

    return 1 + max(height(root->left), height(root->right));
}

Node* updateValue(Node* root, int oldValue, int newValue) {
    if (!search(root, oldValue))
        return root;

    root = deleteNode(root, oldValue);
    root = insert(root, newValue);

    return root;
}

void mirrorTree(Node* root) {
    if (root == nullptr)
        return;

    Node* temp = root->left;
    root->left = root->right;
    root->right = temp;

    mirrorTree(root->left);
    mirrorTree(root->right);
}