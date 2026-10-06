#include "circular_array.h"
#include <iostream>
using namespace std;

CircularQueue::CircularQueue() {
    front = 0;
    rear = -1;
    count = 0;
}

bool CircularQueue::isEmpty() {
    return count == 0;
}

bool CircularQueue::isFull() {
    return count == MAX;
}

void CircularQueue::enqueue(int value) {
    if (isFull()) {
        cout << "Overflow\n";
        return;
    }

    rear = (rear + 1) % MAX;    // ★ CIRCULAR LINE
    arr[rear] = value;

    count++;
}

void CircularQueue::dequeue() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    cout << "Deleted: " << arr[front] << endl;

    front = (front + 1) % MAX;  // ★ CIRCULAR LINE

    count--;
}

void CircularQueue::peek() {
    if (isEmpty())
        cout << "Queue is empty\n";
    else
        cout << "Front: " << arr[front] << endl;
}

void CircularQueue::display() {
    if (isEmpty()) {
        cout << "Queue is empty\n";
        return;
    }

    for (int i = 0; i < count; i++) {
        cout << arr[(front + i) % MAX] << " ";  // ★ CIRCULAR LINE
    }

    cout << endl;
}

void CircularQueue::rotateRight(int k) {
    if (isEmpty())
        return;

    k = k % count;

    for (int i = 0; i < k; i++) {
        front = (front - 1 + MAX) % MAX;  // ★ CIRCULAR LINE
    }
}

void CircularQueue::rotateLeft(int k) {
    if (isEmpty())
        return;

    k = k % count;

    for (int i = 0; i < k; i++) {
        front = (front + 1) % MAX;  // ★ CIRCULAR LINE
    }
}

int main() {
    CircularQueue q;

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);

    cout << "Queue: ";
    q.display();

    q.dequeue();

    cout << "After dequeue: ";
    q.display();

    q.enqueue(6);

    cout << "After circular enqueue: ";
    q.display();

    q.peek();

    q.rotateRight(1);

    cout << "After right rotation: ";
    q.display();

    q.rotateLeft(2);

    cout << "After left rotation: ";
    q.display();

    return 0;
}