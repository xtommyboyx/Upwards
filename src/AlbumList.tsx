import { useEffect, useState } from 'react'
import {Album, DisplayedAlbum} from "./types";

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

        console.log(albums);

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
          <div
            key={album.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {album.image && (
              <img
                src={album.image}
                alt={album.albumTitle}
                width={170}
                height={170}
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginBottom: '10px',
                }}
              />
            )}
            <h3 style={{ fontSize: '14px', margin: '5px 0' }}>{album.albumTitle}</h3>
            <p style={{ fontSize: '12px', color: '#666', margin: '2px 0' }}>{album.artistName}</p>
            <a
              href={album.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '12px', color: '#007bff', textDecoration: 'none' }}
            >
              View on iTunes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}