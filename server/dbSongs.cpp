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
            // play song from spotify api
        }
        void setArtist() {
            cout << "Enter an artist to listen to: "; 
            cin >> artistName; 
            /* for (int i = songArray.begin(); i < songArray.end; i++) {
                return songName; 
            }
            */
            // return list of songs by artist 
        }
        string getArtist(string artistName) {
            return artistName;
        }
}

