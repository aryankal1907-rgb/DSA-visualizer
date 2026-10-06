#include <iostream>
#include "max.h"
using namespace std;

MaxHeap::MaxHeap() {
    size = 0;
}

void MaxHeap::heapifyUp(int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;

        if (arr[parent] >= arr[index])
            break;

        swap(arr[parent], arr[index]);
        index = parent;
    }
}

void MaxHeap::heapifyDown(int index) {
    while (true) {
        int left = 2 * index + 1;
        int right = 2 * index + 2;
        int largest = index;

        if (left < size && arr[left] > arr[largest])
            largest = left;

        if (right < size && arr[right] > arr[largest])
            largest = right;

        if (largest == index)
            break;

        swap(arr[index], arr[largest]);
        index = largest;
    }
}

void MaxHeap::insert(int value) {
    if (size == 100) {
        cout << "Overflow\n";
        return;
    }

    arr[size] = value;
    heapifyUp(size);
    size++;
}

void MaxHeap::deleteElement(int value) {
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

void MaxHeap::update(int oldValue, int newValue) {
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

int MaxHeap::peek() {
    if (size == 0) {
        cout << "Underflow\n";
        return -1;
    }

    return arr[0];
}

int MaxHeap::getSize() {
    return size;
}

void MaxHeap::display() {
    if (size == 0) {
        cout << "Heap is empty\n";
        return;
    }

    for (int i = 0; i < size; i++)
        cout << arr[i] << " ";

    cout << endl;
}

int main() {
    MaxHeap heap;

    heap.insert(30);
    heap.insert(10);
    heap.insert(20);
    heap.insert(50);
    heap.insert(15);

    heap.display();

    cout << "Maximum: " << heap.peek() << endl;

    heap.deleteElement(20);
    heap.display();

    heap.update(30, 60);
    heap.display();

    cout << "Size: " << heap.getSize() << endl;

    return 0;
}