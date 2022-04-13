export type FavItems = {
  external_urls: externalUrls
  follower: {
    href: string | null
    total: number
  }
  genres: string[]
  href: string
  id: number
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

type Image = {
  height: number
  width: number
  url: string
}

export type Album = {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  copyrights: Copyright[]
  external_urls: externalUrls
  genres: string[]
  href: string
  id: string
  images: Image[]
  label: string
  name: string
  popularity: number
  release_date: string
  release_date_precision: string
  total_tracks: number
  tracks: Tracks
  type: string
  uri: string
}

export type Tracks = {
  href: string
  items: Track[]
  limit: number
  next: Track | null
  offset: number
  previous: Track | null
  total: number
}

export type Track = {
  album: Album
  artists: Artist[]
  available_markets: string[]
  duration_ms: number
  explicit: boolean
  external_urls: externalUrls
  href: string
  id: string
  is_local: boolean
  name: string
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export type Artist = {
  external_urls: externalUrls
  href: string
  id: string
  name: string
  images: Image[]
  popularity: number
  type: string
  uri: string
}

type Copyright = {
  text: string
  type: string
}

type externalUrls = {
  spotify: string
}

export type ContextType = {
  state: {
    token: null | String
  }
  timeline: GSAPTimeline
  setTimeline: () => void
  setToken: () => void
}

export type UserProfile = {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: true
    filter_locked: true
  }
  external_urls: externalUrls
  followers: {
    href: string
    total: number
  }
  href: string
  id: string
  images: Image[]
  product: string
  type: string
  uri: string
}

export type Playlist = {
  collaborative: boolean
  description: string
  externalUrls: externalUrls
  href: string
  id: string
  images: Image[]
  name: string
  owner: {
    displayName: string
    externalUrls: externalUrls
    href: string
    id: string
    type: string
    uri: string
  }
  primaryColor: null | string
  public: boolean
  snapshotId: string
  tracks: {
    offset: number
    next: null | string
    href: string
    previous: string
    total: number
    items: PlaylistTrack[]
  }
  type: string
  uri: string
}

type PlaylistTrack = {
  addedAt: string
  isLocal: boolean
  primaryColor: null
  track: Track
}
