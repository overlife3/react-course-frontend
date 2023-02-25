import { retry, takeLatest, put } from "@redux-saga/core/effects" 
import { catalogFailure, catalogRequest, catalogSuccess } from "../redux/catalogReducer"
import getData from "../services/api/getData"

export default function* watchCatalogSaga() {
	yield takeLatest(catalogRequest.type, handleChangeCatalogSaga)
}

function setParams(payload) {
	if (typeof payload !== "object")
		return ""

	if (payload.q === "" && payload.categoryId === "all" && payload.offset === undefined) 
		return ""

	let obj = {}

	if (payload.q !== "") {
		obj.q = payload.q
	} 
	
	if (payload.categoryId !== "all" && payload.categoryId !== undefined) {
		obj.categoryId = payload.categoryId
	}

	if (payload.offset !== undefined) {
		obj.offset = payload.offset
	}

	return "?" + new URLSearchParams(obj)
}

function* handleChangeCatalogSaga(action) {
	try {
		const retryCount = 5
		const retryDelay = 1000
		const data = yield retry(retryCount, retryDelay, getData, `${process.env.REACT_APP_BASE_URL}items` + setParams(action.payload))
		yield put(catalogSuccess(data))
	} catch (e) {
		yield put(catalogFailure(e.message))
	}
}