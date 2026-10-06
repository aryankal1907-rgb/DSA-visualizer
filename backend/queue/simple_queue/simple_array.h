#ifndef SIMPLE_ARRAY_H
#define SIMPLE_ARRAY_H

class Queue {
private:
    int arr[100];
    int front;
    int rear;

public:
    Queue();

    bool isEmpty();
    bool isFull();

    void enqueue(int value);
    void dequeue();
    void peek();
    void display();

    int size();

    void minMax();
    void search(int value);
    void update(int oldValue, int newValue);
    void sort();
    void reverse();
};

#endif