#include <iostream>
#include "min.h"
using namespace std;

MinHeap::MinHeap() {
    size = 0;
}

void MinHeap::heapifyUp(int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;

        if (arr[parent] <= arr[index])
            break;

        swap(arr[parent], arr[index]);
        index = parent;
    }
}

void MinHeap::heapifyDown(int index) {
    while (true) {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int smallest = index;

        if (left < size && arr[left] < arr[smallest])
            smallest = left;

        if (right < size && arr[right] < arr[smallest])
            smallest = right;

        if (smallest == index)
            break;

        swap(arr[index], arr[smallest]);
        index = smallest;
    }
}

void MinHeap::insert(int value) {
    if (size == 100) {
        cout << "Overflow\n";
        return;
    }

    arr[size] = value;
    heapifyUp(size);
    size++;
}

void MinHeap::deleteElement(int value) {
    int index = -1;

    for (int i = 0; i < size; i++) {
        if (arr[i] == value) {
            index = i;
            break;
        }
    }

    if (index == -1) {
        cout << "Element not found\n";
        return;
    }

    arr[index] = arr[size - 1];
    size--;

    if (index < size) {
        heapifyDown(index);
        heapifyUp(index);
    }
}

void MinHeap::update(int oldValue, int newValue) {
    int index = -1;

    for (int i = 0; i < size; i++) {
        if (arr[i] == oldValue) {
            index = i;
            break;
        }
    }

    if (index == -1) {
        cout << "Element not found\n";
        return;
    }

    arr[index] = newValue;

    heapifyDown(index);
    heapifyUp(index);
}

int MinHeap::peek() {
    if (size == 0) {
        cout << "Underflow\n";
        return -1;
    }

    return arr[0];
}

int MinHeap::getSize() {
    return size;
}

void MinHeap::display() {
    if (size == 0) {
        cout << "Heap is empty\n";
        return;
    }

    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";

    cout << endl;
}

int main() {
    MinHeap heap;

    heap.insert(30);
    heap.insert(10);
    heap.insert(20);
    heap.insert(5);
    heap.insert(15);

    heap.display();

    cout << "Minimum: " << heap.peek() << endl;

    heap.deleteElement(10);
    heap.display();

    heap.update(20, 2);
    heap.display();

    cout << "Size: " << heap.getSize() << endl;

    return 0;
}