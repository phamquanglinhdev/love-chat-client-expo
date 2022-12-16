export const addChat = (chat) => {
    return {
        type: "ADD_CHAT",
        value: chat,
    };
};
export const setChat = (chats) => {
    return {
        type: "SET_CHAT",
        value: chats,
    };
};


