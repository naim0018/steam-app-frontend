// import { gamesApi } from '@/redux/api/gamesApi';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// export interface Game {
//   appid: number;
//   name: string;
//   img_icon_url: string;
//   img_logo_url: string;
//   has_community_visible_stats: boolean;
// }

// export interface GameDetails extends Game {
//   steam_appid: number;
//   detailed_description: string;
//   header_image: string;
//   publishers: string[];
// }

// interface GamesState {
//   games: Game[];
//   gameDetails: GameDetails | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: GamesState = {
//   games: [],
//   gameDetails: null,
//   loading: false,
//   error: null,
// };

// export const fetchGames = createAsyncThunk(
//   'games/fetchGames',
//   async () => {
//     return await gamesApi.getAllGames();
//   }
// );

// export const fetchGameDetails = createAsyncThunk(
//   'games/fetchGameDetails',
//   async (appId: number) => {
//     return await gamesApi.getGameDetails(appId);
//   }
// );

// const gamesSlice = createSlice({
//   name: 'games',
//   initialState,
//   reducers: {
//     clearGameDetails: (state) => {
//       state.gameDetails = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Games
//       .addCase(fetchGames.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchGames.fulfilled, (state, action) => {
//         state.loading = false;
//         state.games = action.payload;
//       })
//       .addCase(fetchGames.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch games';
//       })
//       // Fetch Game Details
//       .addCase(fetchGameDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchGameDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.gameDetails = action.payload;
//       })
//       .addCase(fetchGameDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch game details';
//       });
//   },
// });

// export const { clearGameDetails } = gamesSlice.actions;
// export default gamesSlice.reducer; 