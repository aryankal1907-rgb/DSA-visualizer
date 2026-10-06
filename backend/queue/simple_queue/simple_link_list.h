#ifndef simple_link_list_h
#define simple_link_list_h

struct Node {
    int data;
    Node* next;
};

class Queue {
private:
    Node* front;
    Node* rear;
    int count;

public:
    Queue();

    void enqueue(int value);
    void dequeue();
    void peek();
    void display();
    int size();
    bool isEmpty();

    int getMin();
    int getMax();
    bool search(int value);
    void update(int oldValue, int newValue);
    void reverse();
    void sort();
};

#endif