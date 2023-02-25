import { createSlice } from "@reduxjs/toolkit";

const catalogReducer = createSlice({
	name: "catalog",
	initialState: {
		items: [],
		categorie: "all",
		field: '',
		loading: true,
		error: undefined,
	},
	reducers: {
		catalogChangeField(state, action) {
			state.field = action.payload.q
			state.items = []
		},
		catalogChangeCategorie(state, action) {
			state.categorie = action.payload.categoryId
			state.items = []
		},
		catalogRequest(state, action) {
			state.field = action.payload.q
			state.categorie = action.payload.categoryId
			state.loading = true
			state.error = false
		},
		catalogSuccess(state, action) {
			state.items.push(...action.payload)
			state.loading = false
			state.error = undefined            
		},
		catalogFailure(state, action) {
			state.loading = false
			state.error = action.payload
		},
		catalogChangeHeader(state) {
			state.items = []
		}
	}
})

export default catalogReducer.reducer
export const {catalogChangeHeader, catalogChangeField, catalogChangeCategorie, catalogRequest, catalogSuccess, catalogFailure} = catalogReducer.actions