import { useEffect, useState } from 'react'
import { Album, DisplayedAlbum } from "../types";
import AlbumCard from './AlbumCard';
import { BREAKPOINTS, DEFAULTS, GRID, ITUNES_API } from '../constants';
import SearchBar from './SearchBar';
import { SortOption } from './SortDropdown';
import Modal from './Modal';
import AlbumDetails from './AlbumDetails';
import Pagination from './Pagination';

export const getItemsPerPage = (): number => {
  const isCompactMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.COMPACT_MOBILE}px)`).matches;
  const isMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE}px)`).matches;
  const isLargerMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.LARGER_MOBILE}px)`).matches;
  const isTablet = window.matchMedia(`(max-width: ${BREAKPOINTS.TABLET}px)`).matches;

  if (isCompactMobile) {
    return GRID.COLUMNS.COMPACT_MOBILE * GRID.ROWS.COMPACT_MOBILE;
  } else if (isMobile) {
    return GRID.COLUMNS.MOBILE * GRID.ROWS.MOBILE;
  } else if (isLargerMobile) {
    return GRID.COLUMNS.LARGER_MOBILE * GRID.ROWS.LARGER_MOBILE;
  } else if (isTablet) {
    return GRID.COLUMNS.TABLET * GRID.ROWS.TABLET;
  } else {
    return GRID.COLUMNS.DESKTOP * GRID.ROWS.DESKTOP;
  }
};

export default function AlbumList() {
  const [albums, setAlbums] = useState<DisplayedAlbum[]>([]);
  const [filteredAlbums, setFilteredAlbums] = useState<DisplayedAlbum[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const itemsPerPage = getItemsPerPage();
  const [sortOption, setSortOption] = useState<SortOption>('album');
  const [selectedAlbum, setSelectedAlbum] = useState<DisplayedAlbum | null>(null);

  // Sort Albums
  useEffect(() => {
    const sortAlbums = (albums: DisplayedAlbum[]) => {
      const sorted = [...albums];
      switch (sortOption) {
        case 'artist':
          sorted.sort((a, b) => a.artistName.localeCompare(b.artistName));
          break;
        case 'album':
          sorted.sort((a, b) => a.albumTitle.localeCompare(b.albumTitle));
          break;
        case 'date':
          sorted.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
          break;
      }
      return sorted;
    };

    const filtered = searchQuery.trim() === ''
      ? albums
      : albums.filter(album =>
        album.albumTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artistName.toLowerCase().includes(searchQuery.toLowerCase())
      );

    setFilteredAlbums(sortAlbums(filtered));
  }, [searchQuery, albums, sortOption]);

  // Search Bar
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredAlbums(albums);
    } else {
      const query = searchQuery.toLowerCase();

      const filtered = albums.filter(album => {
        const releaseYear = album.releaseDate.split('-')?.[0];

        return (
          album.albumTitle.toLowerCase().includes(query) ||
          album.artistName.toLowerCase().includes(query) ||
          album.genre.toLowerCase().includes(query) ||
          releaseYear.includes(query)
        );
      });
      setFilteredAlbums(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, albums]);

  // Get data, transform into DisplayedAlbum type object array and save to state
  useEffect(() => {
    const getAlbums = async () => {
      const response = await fetch(`${ITUNES_API.BASE_URL}`);
      const data = await response.json();

      // don't show any albums if we don't get the correct data back
      if (data?.feed?.entry) {
        const albums = data.feed.entry.map((album: Album) => {
          const id = album?.id?.attributes?.['im:id'] || crypto.randomUUID();
          const albumTitle = album?.['im:name']?.label || DEFAULTS.UNKNOWN_ALBUM;
          const artistName = album?.['im:artist']?.label || DEFAULTS.UNKNOWN_ARTIST;
          // default to the largest sized image. for mobile and tablets this will be replaced in AlbumCard
          const image = Array.isArray(album?.['im:image'])
            ? album['im:image'].at(-1)?.label
            : undefined;
          const link = album?.link?.attributes?.href || DEFAULTS.FALLBACK_LINK;
          const releaseDate = album?.['im:releaseDate']?.label || DEFAULTS.UNKNOWN_DATE;
          const genre = album?.['category']?.attributes?.label || DEFAULTS.UNKNOWN_GENRE;
          const price = album?.['im:price']?.label || DEFAULTS.UNKNOWN_PRICE;

          return (
            {
              id,
              albumTitle,
              artistName,
              image,
              link,
              releaseDate,
              genre,
              price
            }
          );
        })

        // the default value for Sort is 'album'
        const sortedAlbums = [...albums].sort((a, b) =>
          a.albumTitle.localeCompare(b.albumTitle)
        );

        setAlbums(sortedAlbums);
      }
    };

    getAlbums();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  const totalPages = Math.ceil(filteredAlbums.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = filteredAlbums.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="album-list-container">
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      <div className="album-grid">
        {currentAlbums.map((album: DisplayedAlbum) => (
          <AlbumCard
            {...album}
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
          />
        ))}
      </div>
      {filteredAlbums.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <Modal isOpen={!!selectedAlbum} onClose={() => setSelectedAlbum(null)}>
        {selectedAlbum && <AlbumDetails album={selectedAlbum} />}
      </Modal>
    </div>
  );
}