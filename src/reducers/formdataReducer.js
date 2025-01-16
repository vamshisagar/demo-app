// src/reducers/itemReducer.js
const initialState = {
    formData: {},
};

const formdataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FORM":
            return { ...state, formData: action.payload };
        case "CLEAR_FORM":
            return {
                formData: {},
            };
        default:
            return state;
    }
};

export default formdataReducer;
