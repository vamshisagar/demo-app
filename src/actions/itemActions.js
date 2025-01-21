// src/actions/itemActions.js
import axios from "axios";

const API_URL = "http://localhost:3001/items";

export const setItems = () => async (dispatch) => {
    const response = await axios.get(API_URL);
    dispatch({ type: "SET_ITEMS", payload: response.data });
};

export const addItem = (item) => async (dispatch) => {
    const response = await axios.post(API_URL, item);
    dispatch({ type: "ADD_ITEM", payload: response.data });
};

export const deleteItem = (id) => async (dispatch) => {
    await axios.delete(`${API_URL}/${id}`);
    dispatch({ type: "DELETE_ITEM", payload: id });
};

export const updateItem = (item) => async (dispatch) => {
    await axios.put(`${API_URL}/${item.id}`, item);
    dispatch({ type: "UPDATE_ITEM", payload: item });
};

export const addFormData = (formData) => {
    return {
        type: "ADD_FORM",
        payload: formData,
    };
};

export const clearFormData = () => {
    return {
        type: "CLEAR_FORM",
    };
};
