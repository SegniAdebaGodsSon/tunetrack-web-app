import React, { useState } from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  gap: ${props => props.theme.space[3]}px;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.space[3]}px;
`;

const Input = styled.input`
  padding: ${(props) => props.theme.space[2]}px;
  margin-bottom: ${(props) => props.theme.space[2]}px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
`;

const Select = styled.select`
  padding: ${(props) => props.theme.space[2]}px;
  margin-bottom: ${(props) => props.theme.space[2]}px;
  border: 1px solid ${(props) => props.theme.colors.secondary};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: ${(props) => props.theme.space[2]}px ${(props) => props.theme.space[3]}px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  cursor: pointer;
`;

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
    onSearch(query.trim(), genre.trim());
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="">Select Genre</option>
        <option value="Metal">Metal</option>
        <option value="Alternative Metal">Alternative Metal</option>
        <option value="Rock">Rock</option>
        <option value="Indie Rock">Indie Rock</option>
        <option value="Pop">Pop</option>
        <option value="Indie Pop">Indie Pop</option>
        <option value="Hip Hop">Hip Hop</option>
        <option value="Country">Country</option>
        <option value="Electronic">Electronic</option>
        <option value="Jazz">Jazz</option>
        <option value="Blues">Blues</option>
        <option value="Classical">Classical</option>
        <option value="Folk">Folk</option>
      </Select>
      <Button type="submit">Search</Button>
    </Form>
  );
};

export default SearchBar;
