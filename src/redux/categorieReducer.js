import { createSlice } from "@reduxjs/toolkit";

const categorieReducer = createSlice({
	name: "categorie",
	initialState:{
		items: undefined,
		loading: true,
		error: undefined
	},
	reducers:{
		categorieRequest(state) {
			state.loading = true
			state.error = false
		},
		categoriSuccess(state, action) {
			state.items = action.payload
			state.loading = false
			state.error = undefined           
		},
		categoriFailure(state, action) {
			state.loading = false
			state.error = action.payload
		}
	}
})

export default categorieReducer.reducer
export const {categorieRequest, categoriSuccess, categoriFailure} = categorieReducer.actions