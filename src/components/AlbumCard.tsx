import { DisplayedAlbum } from "../types";

export default function AlbumCard({ id, albumTitle, artistName, image, link }: DisplayedAlbum) {
  return (
    <div
      key={id}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {image && (
        <img
          src={image}
          alt={albumTitle}
          width={170}
          height={170}
          style={{
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
          }}
        />
      )}
      <h3 style={{ fontSize: '14px', margin: '5px 0' }}>{albumTitle}</h3>
      <p style={{ fontSize: '12px', color: '#666', margin: '2px 0' }}>{artistName}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '12px', color: '#007bff', textDecoration: 'none' }}
      >
        View on iTunes
      </a>
    </div>
  );
}