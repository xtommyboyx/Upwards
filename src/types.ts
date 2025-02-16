interface Image {
  label: string;
  attributes: { height: string };
}

export interface Album {
  id: { attributes: { "im:id": string } };
  "im:name": { label: string };
  "im:artist": { label: string };
  "im:image": Image[];
  link: { attributes: { href: string } };
  "im:releaseDate": { label: string };
}

export interface DisplayedAlbum {
  id: string;
  albumTitle: string;
  artistName: string;
  image?: string;
  link: string;
  releaseDate: string;
}