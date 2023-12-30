import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeStorage, getStorage} from "../storage/AppStorage";
import {logI} from "../utils/LogUtils";

interface CountryFollowState {
    value: string[] // redux can not support Set<string>
}

const initialCountryFollowState: CountryFollowState = {
    value: []
}

const countryFollowSlice = createSlice({
    name: 'countryFollow',
    initialState: initialCountryFollowState,
    reducers: {
        follow: (state, action: PayloadAction<string>) => {
            const country = action.payload
            if (!state.value.includes(country)) state.value.push(country)
            changeStorage(state.value).then()
        },
        unfollow: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(item => item !== action.payload)
            changeStorage(state.value).then()
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                asyncRefresh.pending,
                () => logI('refresh start')
            )
            .addCase(
                asyncRefresh.fulfilled,
                (state, action: PayloadAction<string[]>) => {
                    const refreshedData = action.payload
                    if (refreshedData.length > 0) {
                        state.value = refreshedData
                    }
                    logI('refresh end')
                }
            )
    }
})

export const asyncRefresh = createAsyncThunk(
    'follow/followAsync',
    async () => {
        return await getStorage()
    }
)

export const {
    follow,
    unfollow,
} = countryFollowSlice.actions
export default countryFollowSlice.reducer