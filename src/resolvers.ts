import { Resolvers } from "./types";

export const resolvers: Resolvers = {
    Query: {
        featuredPlaylists: (_, __, { dataSources }) => {
            return dataSources.spotifyAPI.getFeaturedPlaylists();
        },
        playlist: (_, { id }, { dataSources }) => {
            return dataSources.spotifyAPI.getPlaylist(id);
        }
    },
    Playlist: {
        tracks: ({ id, tracks }, _, { dataSources }) => {
            return tracks.items 
                ? tracks.items.map(({ track }) => track)
                : dataSources.spotifyAPI.getTracks(id);
        }
    },
    Track: {
        durationMS: (parent) => parent.duration_ms
    }
};