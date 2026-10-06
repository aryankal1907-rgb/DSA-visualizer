#include <iostream>
#include "deque_link_list.h"
using namespace std;

Deque::Deque() {
    front = nullptr;
    rear = nullptr;
    count = 0;
}

bool Deque::isEmpty() {
    return front == nullptr;
}

void Deque::enqueueFront(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->prev = nullptr;
    newNode->next = front;

    if (isEmpty())
        rear = newNode;
    else
        front->prev = newNode;

    front = newNode;
    count++;
}

void Deque::enqueueRear(int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = nullptr;
    newNode->prev = rear;

    if (isEmpty())
        front = newNode;
    else
        rear->next = newNode;

    rear = newNode;
    count++;
}

void Deque::dequeueFront() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    Node* temp = front;
    front = front->next;

    if (front == nullptr)
        rear = nullptr;
    else
        front->prev = nullptr;

    delete temp;
    count--;
}

void Deque::dequeueRear() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    Node* temp = rear;
    rear = rear->prev;

    if (rear == nullptr)
        front = nullptr;
    else
        rear->next = nullptr;

    delete temp;
    count--;
}

void Deque::peekFront() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    cout << "Front: " << front->data << endl;
}

void Deque::peekRear() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    cout << "Rear: " << rear->data << endl;
}

int Deque::size() {
    return count;
}

void Deque::display() {
    if (isEmpty()) {
        cout << "Deque is empty\n";
        return;
    }

    Node* temp = front;

    while (temp != nullptr) {
        cout << temp->data << " ";
        temp = temp->next;
    }

    cout << endl;
}

int main() {
    Deque dq;

    dq.enqueueRear(10);
    dq.enqueueRear(20);
    dq.enqueueFront(5);
    dq.enqueueFront(2);

    dq.display();

    dq.peekFront();
    dq.peekRear();

    dq.dequeueFront();
    dq.dequeueRear();

    dq.display();

    cout << "Size: " << dq.size() << endl;

    return 0;
}