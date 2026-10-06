#ifndef MIN_H
#define MIN_H

class MinHeap {
private:
    int arr[100];
    int size;

    void heapifyUp(int index);
    void heapifyDown(int index);

public:
    MinHeap();

    void insert(int value);
    void deleteElement(int value);
    void update(int oldValue, int newValue);

    int peek();
    int getSize();

    void display();
};

#endif