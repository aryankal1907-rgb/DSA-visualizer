#ifndef ARRAY_H
#define ARRAY_H

#include <vector>
using namespace std;

vector<int> createArray(int size);
void traverseArray(const vector<int>& arr);
int accessArray(const vector<int>& arr, int index);
void insertArray(vector<int>& arr, int index, int value);
void deleteArray(vector<int>& arr, int index);
int sumArray(const vector<int>& arr);
double averageArray(const vector<int>& arr);
vector<int> frequencyArray(const vector<int>& arr);
void reverseArray(vector<int>& arr);

#endif