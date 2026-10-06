#include <iostream>
#include "deque_array.h"
using namespace std;

Deque::Deque() {
    front = 0;
    rear = -1;
    count = 0;
}

bool Deque::isEmpty() {
    return count == 0;
}

bool Deque::isFull() {
    return count == 100;
}

void Deque::enqueueRear(int value) {
    if (isFull()) {
        cout << "Overflow\n";
        return;
    }

    rear = (rear + 1) % 100;
    arr[rear] = value;
    count++;
}

void Deque::enqueueFront(int value) {
    if (isFull()) {
        cout << "Overflow\n";
        return;
    }

    front = (front - 1 + 100) % 100;
    arr[front] = value;

    if (count == 0)
        rear = front;

    count++;
}

void Deque::dequeueFront() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    front = (front + 1) % 100;
    count--;

    if (count == 0) {
        front = 0;
        rear = -1;
    }
}

void Deque::dequeueRear() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    rear = (rear - 1 + 100) % 100;
    count--;

    if (count == 0) {
        front = 0;
        rear = -1;
    }
}

void Deque::peekFront() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    cout << "Front: " << arr[front] << endl;
}

void Deque::peekRear() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    cout << "Rear: " << arr[rear] << endl;
}

int Deque::size() {
    return count;
}

void Deque::display() {
    if (isEmpty()) {
        cout << "Deque is empty\n";
        return;
    }

    for (int i = 0; i < count; i++)
        cout << arr[(front + i) % 100] << " ";

    cout << endl;
}

int main() {
    Deque dq;

    dq.enqueueRear(10);
    dq.enqueueRear(20);
    dq.enqueueFront(5);
    dq.enqueueFront(2);

    dq.display();

    dq.peekFront();
    dq.peekRear();

    dq.dequeueFront();
    dq.dequeueRear();

    dq.display();

    cout << "Size: " << dq.size() << endl;

    return 0;
}