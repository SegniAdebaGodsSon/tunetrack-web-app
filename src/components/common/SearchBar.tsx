import React, { useState } from 'react';

interface SearchBarProps {
    search: string;
    genre: string;
    onSearch: (search: string, genre: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search: initialQuery, genre: initialGenre, onSearch }) => {
    const [query, setQuery] = useState(initialQuery);
    const [genre, setGenre] = useState(initialGenre);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(query, genre);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre..." />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
