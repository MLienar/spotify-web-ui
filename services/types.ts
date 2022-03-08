export type FavItems = {
  external_urls: externalUrls;
  follower: {
    href: string | null;
    total: number;
  };
  genres: string[];
  href: string;
  id: number;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type Image = {
  height: number;
  width: number;
  url: string;
};

export type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_urls: externalUrls;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks: Tracks;
  type: string;
  uri: string;
};

export type Tracks = {
  href: string;
  items: Track[];
  limit: number;
  next: Track | null;
  offset: number;
  previous: Track | null;
  total: number;
};

export type Track = {
  artists: Artist[];
  available_markets: string[];
  duration_ms: number;
  explicit: boolean;
  external_urls: externalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: externalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Copyright = {
  text: string;
  type: string;
};

type externalUrls = {
  spotify: string;
};

export type ContextType = {
  state: {
    token: null | String;
  };
  timeline: any;
  setTimeline: any;
  setToken: any;
};