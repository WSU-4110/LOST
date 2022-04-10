#include <iostream>
using namespace std; 

class dbSongs {
    public: 
        string userEmail;
        string songName; 
        string artistName; 
        int songLoudness; 
        int songTempo; 
        int songKey; 
        string songMood; 
        string songLocation;

    public: 
        void setSong() {
            cout << "Enter a song to listen to: ";
            cin >> songName;
        }
        string getSong(string songName) {
            return songName; 
        }

}