const currentChatReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_CHAT":
            const chat = action.value
            state = chat
    }
    return state
};
export default currentChatReducer;
