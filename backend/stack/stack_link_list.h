#ifndef stack_link_list_h
#define stack_link_list_h

struct Node {
    int data;
    Node* next;
};

class StackLinkedList {
private:
    Node* top;

public:
    StackLinkedList();

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