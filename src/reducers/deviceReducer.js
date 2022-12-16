const deviceReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_DEVICE":
            const device = action.value
            state = device
    }
    return state
};
export default deviceReducer;
