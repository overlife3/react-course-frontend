import { take, put, fork } from "@redux-saga/core/effects"
import { catalogChangeField, catalogRequest } from "../redux/catalogReducer"

export default function* watchChangeFieldSaga() {
	while (true) {
		const action = yield take(catalogChangeField.type)
		yield fork(handleChangeFieldSaga, action)
	}
}

function* handleChangeFieldSaga(action) {
	yield put(catalogRequest(action.payload))
}