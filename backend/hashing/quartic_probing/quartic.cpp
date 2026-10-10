#include "quartic.h"
#include <iostream>
using namespace std;

int QuadraticProbing::hash(int key) {
    return ((key % SIZE) + SIZE) % SIZE;
}

void QuadraticProbing::insert(int key) {
    int index = hash(key);

    for (int i = 0; i < SIZE; i++) {
        int pos = (index + i * i) % SIZE;

        if (state[pos] == 1 && table[pos] == key) {
            cout << "Duplicate key\n";
            return;
        }

        if (state[pos] != 1) {
            table[pos] = key;
            state[pos] = 1;
            cout << "Inserted at " << pos << '\n';
            return;
        }
    }

    cout << "No available slot in probe sequence\n";
}

int QuadraticProbing::search(int key) {
    int index = hash(key);

    for (int i = 0; i < SIZE; i++) {
        int pos = (index + i * i) % SIZE;

        if (state[pos] == 0)
            return -1;

        if (state[pos] == 1 && table[pos] == key)
            return pos;
    }

    return -1;
}

void QuadraticProbing::deleteKey(int key) {
    int pos = search(key);

    if (pos == -1)
        cout << "Key not found\n";
    else {
        state[pos] = 2;
        cout << "Deleted\n";
    }
}

void QuadraticProbing::display() {
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