#ifndef STACK_ARRAY_H
#define STACK_ARRAY_H

class StackArray {
private:
    int* arr;
    int top;
    int capacity;

public:
    StackArray(int size);

    void push(int value);
    int pop();
    int peek();

    bool isEmpty();
    bool isFull();

    void display();
    int count();
    int search(int value);
    int findMin();
    int findMax();
    void update(int position, int value);
    void reverse();
};

#endif