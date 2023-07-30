import gql from 'graphql-tag'

export const typeDefs = gql`
  enum Playback {
    playbackPlaying
    playbackPaused
    playbackNext
    playbackPrevious
  }
`

export const resolvers = {}
