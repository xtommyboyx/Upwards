import { useEffect, useState } from 'react'
import { Album, DisplayedAlbum } from "../types";
import AlbumCard from './AlbumCard';

export default function AlbumList() {
  const [albums, setAlbums] = useState<DisplayedAlbum[]>([]);

  useEffect(() => {
    const getAlbums = async () => {
      const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
      const data = await response.json();

      // don't show any albums if we don't get the correct data back
      if (data?.feed?.entry) {
        const albums = data.feed.entry.map((album: Album) => {
          const id = album?.id?.attributes?.["im:id"] || crypto.randomUUID();
          const albumTitle = album?.['im:name']?.label || 'Unknown Album';
          const artistName = album?.['im:artist']?.label || 'Unknown Artist';
          const image = Array.isArray(album?.['im:image'])
            ? album['im:image'].at(-1)?.label
            : undefined;
          const link = album?.link?.attributes?.href || '#';

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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {albums.map((album: DisplayedAlbum) => (
          <AlbumCard {...album} />
        ))}
      </div>
    </div>
  );
}