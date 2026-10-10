#ifndef SEPARATE_CHAINING_H
#define SEPARATE_CHAINING_H

#include <vector>

class SeparateChaining {
private:
    static const int SIZE = 10;
    std::vector<int> table[SIZE];

    int hash(int key);

public:
    void insert(int key);
    bool search(int key);
    void deleteKey(int key);
    void display();
};

#endif