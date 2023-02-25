import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categorieReducer from "./categorieReducer";
import createSagaMiddleware from "@redux-saga/core";
import saga from "../saga/index";
import { persistStore, 
	persistReducer,
	FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import catalogReducer from "./catalogReducer";
import cartReducer from "./cartReducer";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
	categorie: categorieReducer,
	catalog: catalogReducer,
	cart: cartReducer
})

const persistConfig = {
  key: 'root',
  storage,
	whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(saga)

export const persistor = persistStore(store)
export default store
