import { retry, takeLatest, put } from "@redux-saga/core/effects" 
import { categorieRequest, categoriFailure, categoriSuccess } from "../redux/categorieReducer"
import getData from "../services/api/getData"

function* handleChangeCategorieSaga() {
	try {
		const retryCount = 5
		const retryDelay = 1000
		const data = yield retry(retryCount, retryDelay, getData, `${process.env.REACT_APP_BASE_URL}categories`)
		yield put(categoriSuccess(data))
	} catch (e) {
		yield put(categoriFailure(e.message))
	}
}

export default function* watchCagtegorieSaga() {
	yield takeLatest(categorieRequest.type, handleChangeCategorieSaga)
}