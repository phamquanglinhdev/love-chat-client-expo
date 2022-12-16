const apiReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_API":
            const api = action.value
            state = api
    }
    return state
};
export default apiReducer;
