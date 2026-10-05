#ifndef ARRAY_H
#define ARRAY_H

#include <vector>
using namespace std;

vector<int> createArray(int size);
void traverseArray(const vector<int>& arr);
int accessArray(const vector<int>& arr, int index);
void insertArray(vector<int>& arr, int index, int value);
void deleteArray(vector<int>& arr, int index);
void updateArray(vector<int>& arr, int index, int value);
int sumArray(const vector<int>& arr);
double averageArray(const vector<int>& arr);
void frequencyArray(const vector<int>& arr);
void reverseArray(vector<int>& arr);
int findMin(const vector<int>& arr);
int findMax(const vector<int>& arr);

vector<vector<int> > create2DArray(int rows, int cols);
void traverse2DArray(const vector<vector<int> >& arr);
void insert2DArray(vector<vector<int> >& arr, int row, int col, int value);
void delete2DArray(vector<vector<int> >& arr, int row, int col);
void update2DArray(vector<vector<int> >& arr, int row, int col, int value);
int traceMatrix(const vector<vector<int> >& arr);
double normMatrix(const vector<vector<int> >& arr);
vector<vector<int> > multiplyMatrix(
    const vector<vector<int> >& a,
    const vector<vector<int> >& b
);
bool isSymmetric(const vector<vector<int> >& arr);
bool isSkewSymmetric(const vector<vector<int> >& arr);
vector<vector<int> > transposeMatrix(const vector<vector<int> >& arr);
int findMin2D(const vector<vector<int> >& arr);
int findMax2D(const vector<vector<int> >& arr);

#endif