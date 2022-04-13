import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-top-read',
  'user-read-email',
  'user-library-read',
  'user-modify-playback-state',
  'user-read-private',
  'user-read-playback-state',
  'user-read-playback-position',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-follow-read',
].join(',')

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params)

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyAPI

export { LOGIN_URL }

// Play music through the SDK
const play = ({
  spotify_uri,
  deviceId,
  playerInstance: {
    _options: { getOAuthToken },
  },
}) => {
  getOAuthToken(() => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
      },
    })
  })
}

export { play }
