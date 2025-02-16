import React from 'react';

import { DisplayedAlbum } from "../types";

import { BREAKPOINTS, ITUNES_API } from '../constants';

export default function AlbumCard({ id, albumTitle, artistName, image, link }: DisplayedAlbum) {
  return (
    <div className="album-card">
      {image && (
        <picture>
          <source
            media={`(max-width: ${BREAKPOINTS.MOBILE}`}
            srcSet={image.replace(`${ITUNES_API.IMAGE_SIZES.LARGE}`, `${ITUNES_API.IMAGE_SIZES.SMALL}`)}
          />
          <source
            media={`(max-width: ${BREAKPOINTS.TABLET}`}
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