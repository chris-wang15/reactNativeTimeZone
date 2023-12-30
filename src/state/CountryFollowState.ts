import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CountryFollowState {
    value: Set<string> // [...value] expand set to array
}

const initialCountryFollowState: CountryFollowState = {
    value: new Set<string>()
}

const countryFollowSlice = createSlice({
    name: 'countryFollow',
    initialState: initialCountryFollowState,
    reducers: {
        follow: (state, action: PayloadAction<string>) => {
            state.value.add(action.payload)
        },
        unfollow: (state, action: PayloadAction<string>) => {
            state.value.delete(action.payload)
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(
            followAsync.fulfilled,
            (state, action: PayloadAction<string>) => {
                state.value.add(action.payload)
            }
        )
    }
})

export const followAsync = createAsyncThunk(
    'follow/followAsync',
    async (country: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return country
    }
)

export const {follow, unfollow} = countryFollowSlice.actions
export default countryFollowSlice.reducer