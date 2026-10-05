#ifndef singly_link_list_H
#define singly_link_list_H

struct Node {
    int data;
    Node* next;
};

Node* insertBeginning(Node* head, int value);
Node* insertEnd(Node* head, int value);
Node* insertMiddle(Node* head, int value, int position);

Node* deleteBeginning(Node* head);
Node* deleteEnd(Node* head);
Node* deleteMiddle(Node* head, int position);

void updateNode(Node* head, int position, int value);
void displayList(Node* head);
int searchNode(Node* head, int value);

void sortList(Node* head);
int countNodes(Node* head);
int findMin(Node* head);
int findMax(Node* head);

Node* reverseList(Node* head);

#endif