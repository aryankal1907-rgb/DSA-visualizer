#include "stack_array.h"
#include <iostream>
using namespace std;

StackArray::StackArray(int size) {
    capacity = size;
    arr = new int[capacity];
    top = -1;
}

void StackArray::push(int value) {
    if (isFull()) {
        cout << "Stack Overflow" << endl;
        return;
    }

    arr[++top] = value;
}

int StackArray::pop() {
    if (isEmpty()) {
        cout << "Stack Underflow" << endl;
        return -1;
    }

    return arr[top--];
}

int StackArray::peek() {
    if (isEmpty())
        return -1;

    return arr[top];
}

bool StackArray::isEmpty() {
    return top == -1;
}

bool StackArray::isFull() {
    return top == capacity - 1;
}

void StackArray::display() {
    for (int i = top; i >= 0; i--)
        cout << arr[i] << " ";

    cout << endl;
}

int StackArray::count() {
    return top + 1;
}

int StackArray::search(int value) {
    for (int i = top; i >= 0; i--) {
        if (arr[i] == value)
            return i;
    }

    return -1;
}

int StackArray::findMin() {
    if (isEmpty())
        return -1;

    int minValue = arr[0];

    for (int i = 1; i <= top; i++) {
        if (arr[i] < minValue)
            minValue = arr[i];
    }

    return minValue;
}

int StackArray::findMax() {
    if (isEmpty())
        return -1;

    int maxValue = arr[0];

    for (int i = 1; i <= top; i++) {
        if (arr[i] > maxValue)
            maxValue = arr[i];
    }

    return maxValue;
}

void StackArray::update(int position, int value) {
    if (position < 0 || position > top)
        return;

    arr[position] = value;
}

void StackArray::reverse() {
    int start = 0;
    int end = top;

    while (start < end) {
        swap(arr[start], arr[end]);
        start++;
        end--;
    }
}