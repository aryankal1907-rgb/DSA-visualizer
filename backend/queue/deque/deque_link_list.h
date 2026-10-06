#ifndef DEQUE_LINKED_LIST_H
#define DEQUE_LINKED_LIST_H

struct Node {
    int data;
    Node* next;
    Node* prev;
};

class Deque {
private:
    Node* front;
    Node* rear;
    int count;

public:
    Deque();

    bool isEmpty();

    void enqueueFront(int value);
    void enqueueRear(int value);

    void dequeueFront();
    void dequeueRear();

    void peekFront();
    void peekRear();

    int size();
    void display();
};

#endif