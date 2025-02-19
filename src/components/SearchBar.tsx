import React from 'react';
import SortDropdown, { SortOption } from './SortDropdown';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSort: (option: SortOption) => void;
}

export default function SearchBar({ onSearch, onSort }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-controls">
        <input
          type="search"
          placeholder="Search by album, artist, genre or release year"
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
        <SortDropdown onSort={onSort} />
      </div>
    </div>
  );
}