import { configureStore } from "@reduxjs/toolkit";
import articulosReducer from "./reducers/articulosReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
    reducer: {
        articulos: articulosReducer,
        user: userReducer
    }
})

export default store