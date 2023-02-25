import { take, put, fork } from "@redux-saga/core/effects"
import { catalogChangeCategorie, catalogRequest } from "../redux/catalogReducer"

export default function* watchChangeCategorieSaga() {
	while (true) {
		const action = yield take(catalogChangeCategorie.type)
		yield fork(handleChangeCategorieSaga, action)
	}
}

function* handleChangeCategorieSaga(action) {
	yield put(catalogRequest(action.payload))
}