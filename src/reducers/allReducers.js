import {combineReducers} from "redux";
import tokenReducer from "./tokenReducer";
import chatReducer from "./chatReducer";
import apiReducer from "./apiReducer";
import deviceReducer from "./deviceReducer";
import currentChatReducer from "./currentChatReducer";


export const allReducers = combineReducers({
    token: tokenReducer,
    chats: chatReducer,
    api: apiReducer,
    device: deviceReducer,
    currentChat: currentChatReducer,
});

