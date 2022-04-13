import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyAPI, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    spotifyAPI.setAccessToken(token.accessToken)
    spotifyAPI.setRefreshToken(token.refreshToken)
    const { body: refreshedToken } = await spotifyAPI.refreshAccessToken()

    console.log('REFRESHED TOKEN IS', refreshedToken)
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1hour after refresh
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      authorization: LOGIN_URL,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //   initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }
      //   Return previous token if acces has no expired
      if (Date.now() < token.accessTokenExpires) {
        console.log('TOKEN IS STILL VALID')
        return token
      }
      // If acces token is expired, refresh it
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING ...')
      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})
