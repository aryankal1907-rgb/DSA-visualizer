#ifndef AVL_H
#define AVL_H

struct AVLNode {
    int data;
    int height;
    AVLNode* left;
    AVLNode* right;
};

AVLNode* createAVLNode(int value);

int getHeight(AVLNode* root);
int getBalanceFactor(AVLNode* root);

AVLNode* rightRotate(AVLNode* root);
AVLNode* leftRotate(AVLNode* root);

AVLNode* insertAVL(AVLNode* root, int value);
AVLNode* deleteAVL(AVLNode* root, int value);

#endif