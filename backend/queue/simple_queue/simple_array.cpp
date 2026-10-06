#include "simple_array.h"
#include <iostream>
using namespace std;

Queue::Queue() {
    front = -1;
    rear = -1;
}

bool Queue::isEmpty() {
    return front == -1;
}

bool Queue::isFull() {
    return rear == 99;
}

void Queue::enqueue(int value) {
    if (isFull()) {
        cout << "Overflow\n";
        return;
    }

    if (front == -1)
        front = 0;

    arr[++rear] = value;
}

void Queue::dequeue() {
    if (isEmpty()) {
        cout << "Underflow\n";
        return;
    }

    cout << "Deleted: " << arr[front] << endl;
    front++;

    if (front > rear)
        front = rear = -1;
}

void Queue::peek() {
    if (isEmpty())
        cout << "Queue is empty\n";
    else
        cout << "Front: " << arr[front] << endl;
}

void Queue::display() {
    if (isEmpty()) {
        cout << "Queue is empty\n";
        return;
    }

    for (int i = front; i <= rear; i++)
        cout << arr[i] << " ";

    cout << endl;
}

int Queue::size() {
    if (isEmpty())
        return 0;

    return rear - front + 1;
}

void Queue::minMax() {
    int min = arr[front];
    int max = arr[front];

    for (int i = front + 1; i <= rear; i++) {
        if (arr[i] < min)
            min = arr[i];

        if (arr[i] > max)
            max = arr[i];
    }

    cout << "Min: " << min << endl;
    cout << "Max: " << max << endl;
}

void Queue::search(int value) {
    for (int i = front; i <= rear; i++) {
        if (arr[i] == value) {
            cout << "Found\n";
            return;
        }
    }

    cout << "Not Found\n";
}

void Queue::update(int oldValue, int newValue) {
    for (int i = front; i <= rear; i++) {
        if (arr[i] == oldValue) {
            arr[i] = newValue;
            return;
        }
    }
}

void Queue::sort() {
    for (int i = front; i <= rear; i++) {
        for (int j = front; j < rear; j++) {
            if (arr[j] > arr[j + 1])
                swap(arr[j], arr[j + 1]);
        }
    }
}

void Queue::reverse() {
    int i = front;
    int j = rear;

    while (i < j) {
        swap(arr[i], arr[j]);
        i++;
        j--;
    }
}

int main() {
    Queue q;

    q.enqueue(30);
    q.enqueue(10);
    q.enqueue(40);
    q.enqueue(20);

    cout << "Queue: ";
    q.display();

    q.peek();

    cout << "Size: " << q.size() << endl;

    q.minMax();

    q.search(40);

    q.update(10, 50);

    cout << "After update: ";
    q.display();

    q.sort();

    cout << "After sort: ";
    q.display();

    q.reverse();

    cout << "After reverse: ";
    q.display();

    q.dequeue();

    cout << "After dequeue: ";
    q.display();

    return 0;
}