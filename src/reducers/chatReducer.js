const chatReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_CHAT":
            const chat = action.value
            state = [...state, chat]
            break;
        case "SET_CHAT":
            const chats = action.value
            state = chats
            break;
    }
    return state
};
export default chatReducer;
