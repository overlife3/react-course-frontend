import { spawn } from "@redux-saga/core/effects";
import watchCagtegorieSaga from "./watchCagtegoreSaga";
import watchCatalogSaga from "./watchCatalogSaga";
import watchChangeCategorieSaga from "./watchChangeCategorieSaga";
import watchChangeFieldSaga from "./watchChangeFieldSaga"

export default function* saga() {
	yield spawn(watchCagtegorieSaga)
	yield spawn(watchCatalogSaga)
	yield spawn(watchChangeCategorieSaga)
	yield spawn(watchChangeFieldSaga)
}