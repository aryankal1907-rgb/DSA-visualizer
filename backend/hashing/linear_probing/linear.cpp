#include "linear.h"
#include <iostream>
using namespace std;

int LinearProbing::hash(int key) {
    return ((key % SIZE) + SIZE) % SIZE;
}

void LinearProbing::insert(int key) {
    int index = hash(key);

    for (int i = 0; i < SIZE; i++) {
        int pos = (index + i) % SIZE;

        if (state[pos] == 1 && table[pos] == key) {
            cout << "Duplicate key\n";
            return;
        }

        if (state[pos] != 1) {
            table[pos] = key;
            state[pos] = 1;
            cout << "Inserted\n";
            return;
        }
    }

    cout << "Table full\n";
}

int LinearProbing::search(int key) {
    int index = hash(key);

    for (int i = 0; i < SIZE; i++) {
        int pos = (index + i) % SIZE;

        if (state[pos] == 0)
            return -1;

        if (state[pos] == 1 && table[pos] == key)
            return pos;
    }

    return -1;
}

void LinearProbing::deleteKey(int key) {
    int pos = search(key);

    if (pos == -1)
        cout << "Key not found\n";
    else {
        state[pos] = 2;
        cout << "Deleted\n";
    }
}

void LinearProbing::display() {
    for (int i = 0; i < SIZE; i++) {
        cout << i << ": ";

        if (state[i] == 1)
            cout << table[i];
        else if (state[i] == 2)
            cout << "DELETED";
        else
            cout << "EMPTY";

        cout << '\n';
    }
}