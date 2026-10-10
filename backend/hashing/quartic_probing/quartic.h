#ifndef QUADRATIC_PROBING_H
#define QUADRATIC_PROBING_H

class QuadraticProbing {
private:
    static const int SIZE = 10;
    int table[SIZE] = {};
    int state[SIZE] = {};

    int hash(int key);

public:
    void insert(int key);
    int search(int key);
    void deleteKey(int key);
    void display();
};

#endif