#include "httplib.h"
#include "arrays/array.h"
#include <iostream>

using namespace std;

int main() {
    httplib::Server server;

    server.set_mount_point("/", "../Frontend");

    server.Get("/api/ping", [](const httplib::Request&, httplib::Response& res) {
        res.set_content(
            "{\"message\":\"Hello from the C++ backend\"}",
            "application/json"
        );
    });

    server.Get("/api/array/create", [](const httplib::Request& req, httplib::Response& res) {
        int size = stoi(req.get_param_value("size"));

        vector<int> arr = createArray(size);

        string json = "{\"size\":" + to_string(size) + ",\"array\":[";

        for (int i = 0; i < size; i++) {
            json += to_string(arr[i]);

            if (i < size - 1) {
                json += ",";
            }
        }

        json += "]}";

        res.set_content(json, "application/json");
    });

    cout << "Server running on http://localhost:8080" << endl;

    server.listen("0.0.0.0", 8080);

    return 0;
}