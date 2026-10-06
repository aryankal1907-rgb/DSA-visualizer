#ifndef MAX_H
#define MAX_H

class MaxHeap {
private:
    int arr[100];
    int size;

    void heapifyUp(int index);
    void heapifyDown(int index);

public:
    MaxHeap();

    void insert(int value);
    void deleteElement(int value);
    void update(int oldValue, int newValue);

    int peek();
    int getSize();

    void display();
};

#endif