export default class Search {

    static myInstance = null;

    song_title = "";


    /**
     * @returns {Search}
     */
    static getInstance() {
        if (Search.myInstance == null) {
            Search.myInstance = new Search();
        }

        return this.myInstance;
    }

    getSongTitle() {
        return this.song_title;
    }

    setSongTitle(song) {
        this.song_title = song;
    }
}