#include "circular_link_list.h"
#include <iostream>
using namespace std;

Node* insertBeginning(Node* head, int value) {
    Node* newNode = new Node;
    newNode->data = value;

    if (head == NULL) {
        newNode->next = newNode;
        return newNode;
    }

    Node* temp = head;

    while (temp->next != head)
        temp = temp->next;

    newNode->next = head;
    temp->next = newNode;

    return newNode;
}

Node* insertEnd(Node* head, int value) {
    Node* newNode = new Node;
    newNode->data = value;

    if (head == NULL) {
        newNode->next = newNode;
        return newNode;
    }

    Node* temp = head;

    while (temp->next != head)
        temp = temp->next;

    temp->next = newNode;
    newNode->next = head;

    return head;
}

Node* insertMiddle(Node* head, int value, int position) {
    if (position <= 1)
        return insertBeginning(head, value);

    if (head == NULL)
        return head;

    Node* temp = head;

    for (int i = 1; i < position - 1 && temp->next != head; i++)
        temp = temp->next;

    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = temp->next;
    temp->next = newNode;

    return head;
}

Node* deleteBeginning(Node* head) {
    if (head == NULL)
        return NULL;

    if (head->next == head) {
        delete head;
        return NULL;
    }

    Node* temp = head;

    while (temp->next != head)
        temp = temp->next;

    Node* oldHead = head;
    head = head->next;
    temp->next = head;

    delete oldHead;

    return head;
}

Node* deleteEnd(Node* head) {
    if (head == NULL)
        return NULL;

    if (head->next == head) {
        delete head;
        return NULL;
    }

    Node* temp = head;

    while (temp->next->next != head)
        temp = temp->next;

    Node* last = temp->next;
    temp->next = head;

    delete last;

    return head;
}

Node* deleteMiddle(Node* head, int position) {
    if (head == NULL)
        return NULL;

    if (position <= 1)
        return deleteBeginning(head);

    Node* temp = head;

    for (int i = 1; i < position - 1 && temp->next != head; i++)
        temp = temp->next;

    if (temp->next == head)
        return head;

    Node* node = temp->next;
    temp->next = node->next;

    delete node;

    return head;
}

void updateNode(Node* head, int position, int value) {
    if (head == NULL)
        return;

    Node* temp = head;

    for (int i = 1; i < position; i++) {
        temp = temp->next;

        if (temp == head)
            return;
    }

    temp->data = value;
}

void displayList(Node* head) {
    if (head == NULL) {
        cout << "Empty List" << endl;
        return;
    }

    Node* temp = head;

    do {
        cout << temp->data << " -> ";
        temp = temp->next;
    } while (temp != head);

    cout << "HEAD" << endl;
}

int searchNode(Node* head, int value) {
    if (head == NULL)
        return -1;

    Node* temp = head;
    int position = 1;

    do {
        if (temp->data == value)
            return position;

        temp = temp->next;
        position++;

    } while (temp != head);

    return -1;
}

void sortList(Node* head) {
    if (head == NULL)
        return;

    Node* i = head;

    do {
        Node* j = i->next;

        while (j != head) {
            if (i->data > j->data)
                swap(i->data, j->data);

            j = j->next;
        }

        i = i->next;

    } while (i != head);
}

int countNodes(Node* head) {
    if (head == NULL)
        return 0;

    int count = 0;
    Node* temp = head;

    do {
        count++;
        temp = temp->next;
    } while (temp != head);

    return count;
}

int findMin(Node* head) {
    int minValue = head->data;
    Node* temp = head->next;

    while (temp != head) {
        if (temp->data < minValue)
            minValue = temp->data;

        temp = temp->next;
    }

    return minValue;
}

int findMax(Node* head) {
    int maxValue = head->data;
    Node* temp = head->next;

    while (temp != head) {
        if (temp->data > maxValue)
            maxValue = temp->data;

        temp = temp->next;
    }

    return maxValue;
}

Node* reverseList(Node* head) {
    if (head == NULL || head->next == head)
        return head;

    Node* prev = NULL;
    Node* current = head;
    Node* next = NULL;
    Node* last = head;

    while (last->next != head)
        last = last->next;

    do {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    } while (current != head);

    head->next = prev;
    head = prev;

    return head;
}