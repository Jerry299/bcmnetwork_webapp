import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../services/apiServices";
import { registerUrl, loginUrl } from "../services/urls";

// check local storage for saved user
//const user = JSON.parse(localStorage.getItem("bcn_user"));

export const register = createAsyncThunk(
	registerUrl,
	async (user, thunkAPI) => {
		try {
			return await registerUser(user).data;
		} catch (error) {
			const message = error.response.data.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk(loginUrl, async (user, thunkAPI) => {
	try {
		const response = await loginUser(user);
		return response.data;
	} catch (error) {
		const message = error.response.data.message;
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	user: null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
	isLoggedIn: false,
	token: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
		expiredToken: (state) => {
			state.token = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			console.log(action.payload);
			state.isLoading = false;
			state.user = action.payload;
			state.isSuccess = true;
			state.isError = false;
			// state.token = action.payload.
		});
		builder.addCase(register.rejected, (state, action) => {
			console.log(action.payload);
			state.isError = true;
			state.isLoading = false;
			state.message = action.payload;
			state.user = null;
		});
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.isSuccess = true;
			state.isError = false;
			state.isLoggedIn = true;
			state.message = action.payload;
		});
		builder.addCase(login.rejected, (state, action) => {
			console.log(action, " action here ");
			state.isError = true;
			state.isLoading = false;
			state.message = action.payload;
			state.user = null;
			state.isLoggedIn = false;
		});
	},
});

export const { reset, expiredToken } = userSlice.actions;

export default userSlice.reducer;
