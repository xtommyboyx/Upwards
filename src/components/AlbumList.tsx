import { useEffect, useState } from 'react'
import { Album, DisplayedAlbum } from "../types";
import AlbumCard from './AlbumCard';
import { BREAKPOINTS, DEFAULTS, GRID, ITUNES_API } from '../constants';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = getItemsPerPage();

  useEffect(() => {
    const getAlbums = async () => {
      const response = await fetch(`${ITUNES_API.BASE_URL}`);
      const data = await response.json();

      // don't show any albums if we don't get the correct data back
      if (data?.feed?.entry) {
        const albums = data.feed.entry.map((album: Album) => {
          const id = album?.id?.attributes?.["im:id"] || crypto.randomUUID();
          const albumTitle = album?.['im:name']?.label || DEFAULTS.UNKNOWN_ALBUM;
          const artistName = album?.['im:artist']?.label || DEFAULTS.UNKNOWN_ARTIST;
          // default to the largest sized image. for mobile and tablets this will be replaced in AlbumCard
          const image = Array.isArray(album?.['im:image'])
            ? album['im:image'].at(-1)?.label
            : undefined;
          const link = album?.link?.attributes?.href || DEFAULTS.FALLBACK_LINK;

          return (
            {
              id,
              albumTitle,
              artistName,
              image,
              link
            }
          );
        })

        setAlbums(albums);
      }
    };

    getAlbums();
  }, []);

  const totalPages = Math.ceil(albums.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlbums = albums.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="album-grid">
        {currentAlbums.map((album: DisplayedAlbum) => (
          <AlbumCard {...album} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </>
  );
}