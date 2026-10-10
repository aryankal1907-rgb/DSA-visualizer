    #include "link.h"
#include <iostream>
using namespace std;

int SeparateChaining::hash(int key) {
    return ((key % SIZE) + SIZE) % SIZE;
}

void SeparateChaining::insert(int key) {
    int index = hash(key);

    for (int value : table[index]) {
        if (value == key) {
            cout << "Duplicate key\n";
            return;
        }
    }

    table[index].push_back(key);
    cout << "Inserted\n";
}

bool SeparateChaining::search(int key) {
    for (int value : table[hash(key)]) {
        if (value == key)
            return true;
    }

    return false;
}

void SeparateChaining::deleteKey(int key) {
    int index = hash(key);

    for (auto it = table[index].begin();
         it != table[index].end(); ++it) {
        if (*it == key) {
            table[index].erase(it);
            cout << "Deleted\n";
            return;
        }
    }

    cout << "Key not found\n";
}

void SeparateChaining::display() {
    for (int i = 0; i < SIZE; i++) {
        cout << i << ": ";

        for (int key : table[i])
            cout << key << " -> ";

        cout << "NULL\n";
    }
}