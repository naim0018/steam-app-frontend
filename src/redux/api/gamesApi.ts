import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Game, GameDetails } from './steamApi';

interface GetGamesParams {
  page?: number;
  limit?: number;
}

export interface GamesResponse {
  data: Game[];
  meta: {
    page: number;
    limit: number;
    totalGames: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const gamesApi = createApi({
  reducerPath: 'gamesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/v1',
  }),
  endpoints: (builder) => ({
    getAllGames: builder.query<GamesResponse, GetGamesParams>({
      query: (params = {}) => {
        const { 
          page = 1, 
          limit = 24
        } = params;
        
        return {
          url: '/steam',
          params: { page, limit }
        };
      },
    }),
    getGamesDetailsById: builder.query<{ data: GameDetails }, number>({
      query: (appId) => `/steam/${appId}`,
    }),
  }),
});

export const { useGetAllGamesQuery, useGetGamesDetailsByIdQuery } = gamesApi;

// // Helper functions for image URLs
// export const getGameHeaderImage = (appId: number, imgLogoUrl: string): string => {
//   return `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imgLogoUrl}.jpg`;
// };

// export const getGameIconUrl = (appId: number, imgIconUrl: string): string => {
//   return `https://media.steampowered.com/steamcommunity/public/images/apps/${appId}/${imgIconUrl}.jpg`;
// }; 