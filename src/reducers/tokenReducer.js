const tokenReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            const token = action.value
            state = token
    }
    return state
};
export default tokenReducer;
