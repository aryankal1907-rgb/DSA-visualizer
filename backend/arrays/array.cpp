#include <iostream>
#include <algorithm>
#include "array.h"

vector<int> createArray(int size) {
    vector<int> arr;

    for (int i = 0; i < size; i++)
        arr.push_back(0);

    return arr;
}

void traverseArray(const vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++)
        cout << arr[i] << " ";
}

int accessArray(const vector<int>& arr, int index) {
    return arr[index];
}

void insertArray(vector<int>& arr, int index, int value) {
    arr.insert(arr.begin() + index, value);
}

void deleteArray(vector<int>& arr, int index) {
    arr.erase(arr.begin() + index);
}

int sumArray(const vector<int>& arr) {
    int sum = 0;

    for (int x : arr)
        sum += x;

    return sum;
}

double averageArray(const vector<int>& arr) {
    return (double)sumArray(arr) / arr.size();
}

vector<int> frequencyArray(const vector<int>& arr) {
    vector<int> freq;

    for (int i = 0; i < arr.size(); i++) {
        int count = 0;

        for (int j = 0; j < arr.size(); j++)
            if (arr[i] == arr[j])
                count++;

        freq.push_back(count);
    }

    return freq;
}

void reverseArray(vector<int>& arr) {
    int i = 0;
    int j = arr.size() - 1;

    while (i < j) {
        swap(arr[i], arr[j]);
        i++;
        j--;
    }
}