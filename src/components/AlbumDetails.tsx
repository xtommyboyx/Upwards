import React from 'react';
import { DisplayedAlbum } from '../types';
import { formatDate } from '../utils/formatters';

interface AlbumDetailsProps {
  album: DisplayedAlbum;
}

export default function AlbumDetails({ album }: AlbumDetailsProps) {
  return (
    <div className="album-details">
      <div className="album-details-header">
        <img
          src={album.image}
          alt={album.albumTitle}
          className="album-details-image"
        />
        <div className="album-details-title">
          <h2>{album.albumTitle}</h2>
          <h3>{album.artistName}</h3>
        </div>
      </div>

      <div className="album-details-info">
        <div className="info-row">
          <span className="info-label">Release Date:</span>
          <span>{formatDate(album.releaseDate)}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Genre:</span>
          <span>{album.genre || 'Unknown'}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Price:</span>
          <span>{album.price || 'Not available'}</span>
        </div>
        <a
          href={album.link}
          target="_blank"
          rel="noopener noreferrer"
          className="itunes-link"
        >
          View on iTunes
        </a>
      </div>
    </div>
  );
}