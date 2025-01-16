// src/reducers/itemReducer.js
const initialState = {
    userformData: null,
};

const formdataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_FORM":
            return { userformData: action.payload };
        case "CLEAR_FORM":
            return {
                userformData: null,
            };
        default:
            return state;
    }
};

export default formdataReducer;
