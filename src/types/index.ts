export interface Song {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

export interface SongsState {
    search: string;
    genre: string;
    page: number;
    pageSize: number;
    totalCount: number;
    songs: Song[];
    loading: boolean;
    error: string | null;
}

