import {StyleSheet} from "react-native";

export const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',

    },
    bgMain: {
        backgroundColor: "#FFB6C1"
    },
    textMain: {
        color: "#FFB6C1"
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: "white",
        marginBottom: 20
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white"
    },
    header: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    chatInput: {
        backgroundColor: "white",
        width: "65%",
        padding: 3,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
    received: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 2,
        borderColor: "#FFB6C1",
        padding: 10,
        margin: 10,
        maxWidth: "70%",
    },
    send: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignSelf: "flex-end",
        backgroundColor: "#FFB6C1",
        padding: 10,
        margin: 10,
        maxWidth: "70%",
    }
});
