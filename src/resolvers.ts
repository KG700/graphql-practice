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
    Mutation: {
        addItemsToPlaylist: async (_, { input }, { dataSources }) => {
            try {
                const response = await dataSources.spotifyAPI.addItemsToPlaylist(input);
                if (response.snapshot_id) {
                    return {
                        code: 200,
                        success: true,
                        message: "Tracks added to playlist!",
                        playlistId: response.snapshot_id
                    }
                } else {
                    throw Error("snapshot_id property not found");
                }
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: `Something went wrong: ${err}`,
                    playlistId: null
                }
            }
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
    },
    AddItemsToPlaylistPayload: {
        playlist: ({ playlistId }, _, { dataSources }) => {
            return dataSources.spotifyAPI.getPlaylist(playlistId);
        }
    }
};