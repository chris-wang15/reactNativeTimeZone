import {configureStore} from "@reduxjs/toolkit";
import countryFollowReducer from "./CountryFollowState";

export const store = configureStore({
    reducer: {
        follow: countryFollowReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
