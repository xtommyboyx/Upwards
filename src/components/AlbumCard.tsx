import React from 'react';

import { DisplayedAlbum } from "../types";

import { BREAKPOINTS, ITUNES_API } from '../constants';

interface AlbumCardProps extends DisplayedAlbum {
  onClick: () => void;
}

export default function AlbumCard({ onClick, id, albumTitle, artistName, genre, image, link }: AlbumCardProps) {
  return (
    <div className="album-card" onClick={onClick}>
      {image && (
        <picture>
          <source
            media={`(max-width: ${BREAKPOINTS.MOBILE}px`}
            srcSet={image.replace(`${ITUNES_API.IMAGE_SIZES.LARGE}`, `${ITUNES_API.IMAGE_SIZES.SMALL}`)}
          />
          <source
            media={`(max-width: ${BREAKPOINTS.TABLET}px`}
            srcSet={image.replace(`${ITUNES_API.IMAGE_SIZES.LARGE}`, `${ITUNES_API.IMAGE_SIZES.MEDIUM}`)}
          />
          <img
            className="album-image"
            src={image}
            alt={albumTitle}
            loading="lazy"
          />
        </picture>
      )}
      <h3 className="album-title">{albumTitle}</h3>
      <p className="album-artist">{artistName}</p>
      <p className="album-genre">{genre}</p>
      <a className="album-link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on iTunes
      </a>
    </div>
  );
}