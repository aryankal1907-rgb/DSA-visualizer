#include "array.h"
#include <iostream>
#include <cmath>
using namespace std;

vector<int> createArray(int size) {
    return vector<int>(size);
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

void updateArray(vector<int>& arr, int index, int value) {
    arr[index] = value;
}

int sumArray(const vector<int>& arr) {
    int sum = 0;

    for (int i = 0; i < arr.size(); i++)
        sum += arr[i];

    return sum;
}

double averageArray(const vector<int>& arr) {
    return (double)sumArray(arr) / arr.size();
}

void frequencyArray(const vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        int count = 0;

        for (int j = 0; j < arr.size(); j++) {
            if (arr[i] == arr[j])
                count++;
        }

        cout << arr[i] << " : " << count << endl;
    }
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

int findMin(const vector<int>& arr) {
    int minValue = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] < minValue)
            minValue = arr[i];
    }

    return minValue;
}

int findMax(const vector<int>& arr) {
    int maxValue = arr[0];

    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > maxValue)
            maxValue = arr[i];
    }

    return maxValue;
}

vector<vector<int> > create2DArray(int rows, int cols) {
    return vector<vector<int> >(rows, vector<int>(cols));
}

void traverse2DArray(const vector<vector<int> >& arr) {
    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr[i].size(); j++)
            cout << arr[i][j] << " ";

        cout << endl;
    }
}

void insert2DArray(vector<vector<int> >& arr, int row, int col, int value) {
    arr[row][col] = value;
}

void delete2DArray(vector<vector<int> >& arr, int row, int col) {
    arr[row][col] = 0;
}

void update2DArray(vector<vector<int> >& arr, int row, int col, int value) {
    arr[row][col] = value;
}

int traceMatrix(const vector<vector<int> >& arr) {
    int trace = 0;

    for (int i = 0; i < arr.size(); i++)
        trace += arr[i][i];

    return trace;
}

double normMatrix(const vector<vector<int> >& arr) {
    double sum = 0;

    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr[i].size(); j++)
            sum += arr[i][j] * arr[i][j];
    }

    return sqrt(sum);
}

vector<vector<int> > multiplyMatrix(
    const vector<vector<int> >& a,
    const vector<vector<int> >& b
) {
    int rows = a.size();
    int cols = b[0].size();
    int common = b.size();

    vector<vector<int> > result(rows, vector<int>(cols, 0));

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            for (int k = 0; k < common; k++)
                result[i][j] += a[i][k] * b[k][j];
        }
    }

    return result;
}

bool isSymmetric(const vector<vector<int> >& arr) {
    int n = arr.size();

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (arr[i][j] != arr[j][i])
                return false;
        }
    }

    return true;
}

bool isSkewSymmetric(const vector<vector<int> >& arr) {
    int n = arr.size();

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (arr[i][j] != -arr[j][i])
                return false;
        }
    }

    return true;
}

vector<vector<int> > transposeMatrix(const vector<vector<int> >& arr) {
    int rows = arr.size();
    int cols = arr[0].size();

    vector<vector<int> > result(cols, vector<int>(rows));

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            result[j][i] = arr[i][j];
        }
    }

    return result;
}

int findMin2D(const vector<vector<int> >& arr) {
    int minValue = arr[0][0];

    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr[i].size(); j++) {
            if (arr[i][j] < minValue)
                minValue = arr[i][j];
        }
    }

    return minValue;
}

int findMax2D(const vector<vector<int> >& arr) {
    int maxValue = arr[0][0];

    for (int i = 0; i < arr.size(); i++) {
        for (int j = 0; j < arr[i].size(); j++) {
            if (arr[i][j] > maxValue)
                maxValue = arr[i][j];
        }
    }

    return maxValue;
}