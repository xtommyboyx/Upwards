import React from 'react';

export type SortOption = 'artist' | 'album' | 'date';

interface SortDropdownProps {
  onSort: (option: SortOption) => void;
}

export default function SortDropdown({ onSort }: SortDropdownProps) {
  return (
    <select
      className="sort-dropdown"
      onChange={(e) => onSort(e.target.value as SortOption)}
      defaultValue="album"
    >
      <option value="album">Album Name</option>
      <option value="artist">Artist Name</option>
      <option value="date">Release Date</option>
    </select>
  );
}