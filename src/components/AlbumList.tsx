import { useEffect, useState } from 'react'
import { Album, DisplayedAlbum } from "../types";
import AlbumCard from './AlbumCard';
import { DEFAULTS, ITUNES_API } from '../constants';

export default function AlbumList() {
  const [albums, setAlbums] = useState<DisplayedAlbum[]>([]);

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


  return (
    <div className="album-grid">
      {albums.map((album: DisplayedAlbum) => (
        <AlbumCard {...album} />
      ))}
    </div>
  );
}