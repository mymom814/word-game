#include <bits/stdc++.h>
using namespace std;
string str, filename, confirm, key, dvalue;
bool defaultt;
string insert;
int main() {
	//freopen(".inp", "r", stdin);
	ofstream file;
	cout << "a simple json file generator \nmade by quinten (@quinten814)\n";
	cout << "type file name:";
	cin >> filename;
	cout << "warning: if the file exists, the contents of the file will be deleted. press \"y\" to continue, or another string to close. \n";
	cin >> confirm;
	if (confirm != "y") {
		cout << "okay then.";
		return 0;
	}
	file.open(filename);
	cout << "should the values be default? ";
	cin >> insert;
	if (insert == "yes" || insert == "Yes" || insert == "YES" || insert == "Y" || insert == "yee") defaultt = true;
	else defaultt = false;
	if (defaultt) {
		cout << "what should the default value be? \n";
		cin >> dvalue;
	}
	cout << "enter your keys below. type \"\\end\" to end program.\n";
	file << "{ \n";
	getline(cin, str);
	file << "\"";
	file << str;
	file << "\" : \"";
	if (!defaultt) {
		cout << "waiting for value... \n";
		getline(cin, str);
		file << str;
	}
	else {
		file << dvalue;
	}
	file << "\"";
	cout << "waiting for another key... \n";
	getline(cin, str);
	while(str != "\\end"){
		file << ",";
		file << "\n";
		file << "\"";
		file << str;
		file << "\" : \"";
		if (!defaultt) {
			cout << "waiting for value... \n";
			getline(cin, str);
			file << str;
		}
		else {
			file << dvalue;
		}
		file << "\"";
		cout << "waiting for another key... \n";
		getline(cin, str);
	}
	file << "\n}";
	cout << "done!";
}
