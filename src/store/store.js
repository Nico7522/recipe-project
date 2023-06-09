import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './root.reducer';
import {REGISTER, PURGE, PERSIST, PAUSE, REHYDRATE, FLUSH} from "redux-persist/es/constants";
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.dev,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    })

});

export const persistor = persistStore(store)