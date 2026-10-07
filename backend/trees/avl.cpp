#include "avl.h"
#include <algorithm>

using namespace std;

AVLNode* createAVLNode(int value) {
    AVLNode* newNode = new AVLNode;

    newNode->data = value;
    newNode->height = 1;
    newNode->left = nullptr;
    newNode->right = nullptr;

    return newNode;
}

int getHeight(AVLNode* root) {
    if (root == nullptr)
        return 0;

    return root->height;
}

int getBalanceFactor(AVLNode* root) {
    if (root == nullptr)
        return 0;

    return getHeight(root->left) - getHeight(root->right);
}

AVLNode* rightRotate(AVLNode* root) {
    AVLNode* leftChild = root->left;
    AVLNode* temp = leftChild->right;

    leftChild->right = root;
    root->left = temp;

    root->height = 1 + max(getHeight(root->left), getHeight(root->right));
    leftChild->height = 1 + max(getHeight(leftChild->left), getHeight(leftChild->right));

    return leftChild;
}

AVLNode* leftRotate(AVLNode* root) {
    AVLNode* rightChild = root->right;
    AVLNode* temp = rightChild->left;

    rightChild->left = root;
    root->right = temp;

    root->height = 1 + max(getHeight(root->left), getHeight(root->right));
    rightChild->height = 1 + max(getHeight(rightChild->left), getHeight(rightChild->right));

    return rightChild;
}

AVLNode* insertAVL(AVLNode* root, int value) {
    if (root == nullptr)
        return createAVLNode(value);

    if (value < root->data)
        root->left = insertAVL(root->left, value);
    else if (value > root->data)
        root->right = insertAVL(root->right, value);
    else
        return root;

    root->height = 1 + max(getHeight(root->left), getHeight(root->right));

    int balance = getBalanceFactor(root);

    if (balance > 1 && value < root->left->data)
        return rightRotate(root);

    if (balance < -1 && value > root->right->data)
        return leftRotate(root);

    if (balance > 1 && value > root->left->data) {
        root->left = leftRotate(root->left);
        return rightRotate(root);
    }

    if (balance < -1 && value < root->right->data) {
        root->right = rightRotate(root->right);
        return leftRotate(root);
    }

    return root;
}

AVLNode* deleteAVL(AVLNode* root, int value) {
    if (root == nullptr)
        return nullptr;

    if (value < root->data)
        root->left = deleteAVL(root->left, value);

    else if (value > root->data)
        root->right = deleteAVL(root->right, value);

    else {

        // Case 1: Node has no child
        if (root->left == nullptr && root->right == nullptr) {
            delete root;
            return nullptr;
        }

        // Case 2: Node has one child
        if (root->left == nullptr) {
            AVLNode* temp = root->right;
            delete root;
            return temp;
        }

        if (root->right == nullptr) {
            AVLNode* temp = root->left;
            delete root;
            return temp;
        }

        // Case 3: Node has two children
        AVLNode* temp = root->right;

        while (temp->left != nullptr)
            temp = temp->left;

        root->data = temp->data;
        root->right = deleteAVL(root->right, temp->data);
    }

    root->height = 1 + max(getHeight(root->left), getHeight(root->right));

    int balance = getBalanceFactor(root);

    if (balance > 1 && getBalanceFactor(root->left) >= 0)
        return rightRotate(root);

    if (balance > 1 && getBalanceFactor(root->left) < 0) {
        root->left = leftRotate(root->left);
        return rightRotate(root);
    }

    if (balance < -1 && getBalanceFactor(root->right) <= 0)
        return leftRotate(root);

    if (balance < -1 && getBalanceFactor(root->right) > 0) {
        root->right = rightRotate(root->right);
        return leftRotate(root);
    }

    return root;
}