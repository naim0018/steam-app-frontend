import { configureStore } from '@reduxjs/toolkit';
import { gamesApi } from '../api/gamesApi';
// import { steamApi } from '../api/steamApi';


export const store = configureStore({
  reducer: {
    // [steamApi.reducerPath]: steamApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(steamApi.middleware),
    getDefaultMiddleware().concat(gamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 