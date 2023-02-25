import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
	name: "cart",
	initialState:{
		items: [],
		loading: true,
		error: null,
		arrNewPrice: null
	},
	reducers: {
		cartChangeItems(state, { payload }) {
			state.items = payload
		},
		cartChangeLoading(state, { payload }) {
			state.loading = payload
			state.error = null
		},
		cartChangeError(state, { payload }) {
			state.error = payload
			state.loading = false
		},
		cartChangeNewPrice(state, { payload }) {
			state.arrNewPrice = payload
			state.loading = false
		}
	}
})

export default cartReducer.reducer
export const { cartChangeItems, cartChangeLoading, cartChangeNewPrice, cartChangeError } = cartReducer.actions