#include "singly_link_list.h"
#include <iostream>
using namespace std;

Node* insertBeginning(Node* head, int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = head;
    return newNode;
}

Node* insertEnd(Node* head, int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = NULL;

    if (head == NULL)
        return newNode;

    Node* temp = head;

    while (temp->next != NULL)
        temp = temp->next;

    temp->next = newNode;
    return head;
}

Node* insertMiddle(Node* head, int value, int position) {
    if (position <= 1)
        return insertBeginning(head, value);

    Node* temp = head;

    for (int i = 1; i < position - 1 && temp != NULL; i++)
        temp = temp->next;

    if (temp == NULL)
        return head;

    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = temp->next;
    temp->next = newNode;

    return head;
}

Node* deleteBeginning(Node* head) {
    if (head == NULL)
        return NULL;

    Node* temp = head;
    head = head->next;
    delete temp;

    return head;
}

Node* deleteEnd(Node* head) {
    if (head == NULL)
        return NULL;

    if (head->next == NULL) {
        delete head;
        return NULL;
    }

    Node* temp = head;

    while (temp->next->next != NULL)
        temp = temp->next;

    delete temp->next;
    temp->next = NULL;

    return head;
}

Node* deleteMiddle(Node* head, int position) {
    if (head == NULL)
        return NULL;

    if (position <= 1)
        return deleteBeginning(head);

    Node* temp = head;

    for (int i = 1; i < position - 1 && temp->next != NULL; i++)
        temp = temp->next;

    if (temp->next == NULL)
        return head;

    Node* node = temp->next;
    temp->next = node->next;
    delete node;

    return head;
}

void updateNode(Node* head, int position, int value) {
    Node* temp = head;

    for (int i = 1; i < position && temp != NULL; i++)
        temp = temp->next;

    if (temp != NULL)
        temp->data = value;
}

void displayList(Node* head) {
    Node* temp = head;

    while (temp != NULL) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }

    cout << "NULL" << endl;
}

int searchNode(Node* head, int value) {
    Node* temp = head;
    int position = 1;

    while (temp != NULL) {
        if (temp->data == value)
            return position;

        temp = temp->next;
        position++;
    }

    return -1;
}

void sortList(Node* head) {
    for (Node* i = head; i != NULL; i = i->next) {
        for (Node* j = i->next; j != NULL; j = j->next) {
            if (i->data > j->data)
                swap(i->data, j->data);
        }
    }
}

int countNodes(Node* head) {
    int count = 0;
    Node* temp = head;

    while (temp != NULL) {
        count++;
        temp = temp->next;
    }

    return count;
}

int findMin(Node* head) {
    int minValue = head->data;
    Node* temp = head->next;

    while (temp != NULL) {
        if (temp->data < minValue)
            minValue = temp->data;

        temp = temp->next;
    }

    return minValue;
}

int findMax(Node* head) {
    int maxValue = head->data;
    Node* temp = head->next;

    while (temp != NULL) {
        if (temp->data > maxValue)
            maxValue = temp->data;

        temp = temp->next;
    }

    return maxValue;
}

Node* reverseList(Node* head) {
    Node* prev = NULL;
    Node* current = head;

    while (current != NULL) {
        Node* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    return prev;
}