#include "stack_link_list.h"
#include <iostream>
using namespace std;

StackLinkedList::StackLinkedList() {
    top = NULL;
}

void StackLinkedList::push(int value) {
    Node* newNode = new Node;

    newNode->data = value;
    newNode->next = top;

    top = newNode;
}

int StackLinkedList::pop() {
    if (isEmpty()) {
        cout << "Stack Underflow" << endl;
        return -1;
    }

    Node* temp = top;
    int value = temp->data;

    top = top->next;
    delete temp;

    return value;
}

int StackLinkedList::peek() {
    if (isEmpty())
        return -1;

    return top->data;
}

bool StackLinkedList::isEmpty() {
    return top == NULL;
}

bool StackLinkedList::isFull() {
    Node* temp = new(nothrow) Node;

    if (temp == NULL)
        return true;

    delete temp;
    return false;
}

void StackLinkedList::display() {
    Node* temp = top;

    while (temp != NULL) {
        cout << temp->data << " ";
        temp = temp->next;
    }

    cout << endl;
}

int StackLinkedList::count() {
    int count = 0;
    Node* temp = top;

    while (temp != NULL) {
        count++;
        temp = temp->next;
    }

    return count;
}

int StackLinkedList::search(int value) {
    Node* temp = top;
    int position = 0;

    while (temp != NULL) {
        if (temp->data == value)
            return position;

        temp = temp->next;
        position++;
    }

    return -1;
}

int StackLinkedList::findMin() {
    if (isEmpty())
        return -1;

    int minValue = top->data;
    Node* temp = top->next;

    while (temp != NULL) {
        if (temp->data < minValue)
            minValue = temp->data;

        temp = temp->next;
    }

    return minValue;
}

int StackLinkedList::findMax() {
    if (isEmpty())
        return -1;

    int maxValue = top->data;
    Node* temp = top->next;

    while (temp != NULL) {
        if (temp->data > maxValue)
            maxValue = temp->data;

        temp = temp->next;
    }

    return maxValue;
}

void StackLinkedList::update(int position, int value) {
    Node* temp = top;

    for (int i = 0; i < position && temp != NULL; i++)
        temp = temp->next;

    if (temp != NULL)
        temp->data = value;
}