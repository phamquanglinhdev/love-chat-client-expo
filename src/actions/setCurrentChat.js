const setCurrentChat = (chat) => {
    return {
        type: "SET_CURRENT_CHAT",
        value: chat,
    };
};
export default setCurrentChat;
