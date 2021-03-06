import axios from "./axios";

export async function getFriends() {
    const { data } = await axios.get("/friendships");
    console.log("Action get friends returns", data);
    return {
        type: "GET_FRIENDSHIPS",
        users: data
    };
}

export async function becomeFriends(id) {
    const { data } = await axios.post("/friendship/accept/" + id);
    console.log("Becoming Friends", data);
    return {
        type: "ACCEPT_FRIENDSHIP",
        id
    };
}

export async function unfriend(id) {
    const { data } = await axios.post("/friendship/delete/" + id);
    console.log("Unfriending", id);
    return {
        type: "REJECT_FRIENDSHIP",
        id
    };
}
export function onlineUsers(users) {
    console.log(users);
    return {
        type: "ONLINE_USERS",
        onlineusers: users
    };
}
export function userJoined(user) {
    console.log(user);
    return {
        type: "USER_JOINED",
        onlineusers: user
    };
}
export function userLeft(user) {
    console.log("In User left ", user);
    return {
        type: "USER_LEFT",
        user
    };
}
export function getLastMessages(chats) {
    console.log("Getting the last messages ", chats);
    return {
        type: "GET_PUBLIC_MESSAGES",
        chats
    };
}
export function addNewChatToRedux(chat) {
    console.log("Adding the chat to Redux", chat);
    return {
        type: "NEW_PUBLIC_MESSAGE",
        chat
    };
}
export async function getQueens() {
    const { data } = await axios.get("/queens/season/11");
    console.log("Get queens action", data);
    return {
        type: "GET_RPDR_QUEENS",
        data
    };
}
export async function getRanking(queenId) {
    const { data } = await axios.get("/queens/ranking/" + queenId);
    console.log("Get queens action", data);
    return {
        type: "GET_RANKING_QUEEN",
        data
    };
}
export async function getOwnRanking(queenId) {
    const { data } = await axios.get("/queens/own/ranking/" + queenId);
    console.log("Get queens action", data);
    return {
        type: "GET_OWN_RANKING_QUEEN",
        data
    };
}
export async function setSeasons(seasons) {
    console.log("Setting the seasons", seasons);
    return {
        type: "SET_SEASONS",
        seasons
    };
}
