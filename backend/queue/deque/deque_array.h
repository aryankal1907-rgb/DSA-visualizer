#ifndef DEQUE_ARRAY_H
#define DEQUE_ARRAY_H

class Deque {
private:
    int arr[100];
    int front;
    int rear;
    int count;

public:
    Deque();

    bool isEmpty();
    bool isFull();

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