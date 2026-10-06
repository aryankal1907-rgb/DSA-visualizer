#ifndef CIRCULAR_ARRAY_H
#define CIRCULAR_ARRAY_H

#define MAX 5

class CircularQueue {
private:
    int arr[MAX];
    int front;
    int rear;
    int count;

public:
    CircularQueue();

    bool isEmpty();
    bool isFull();

    void enqueue(int value);
    void dequeue();
    void peek();
    void display();

    void rotateLeft(int k);
    void rotateRight(int k);
};

#endif