import {connect} from "react-redux";
import {Image, ScrollView, TextInput, View} from "react-native";
import {Button} from "react-native-paper";
import {appStyles} from "../styles/appStyle";
import Icon from 'react-native-vector-icons/Ionicons';
import Received from "../components/received";
import Send from "../components/send";
import {useEffect, useRef, useState} from "react";
import {addChat, setChat} from "../actions/chatAction";
import axios from "axios";
import * as Notifications from 'expo-notifications';

const ChatScreen = (props) => {
    useEffect(() => {
        Notifications.addNotificationReceivedListener(notification => {
            axios.post(baseUrl + "chats", {}, {
                headers: {
                    Authorization: props.props.token
                }
            }).then((response) => {
                props.dispatch(setChat(response.data))
            }).catch((error) => {
                console.log(error)
            })
        })
        const baseUrl = props.props.api;
        axios.post(baseUrl + "chats", {}, {
            headers: {
                Authorization: props.props.token
            }
        }).then((response) => {
            props.dispatch(setChat(response.data))
        }).catch((error) => {
            console.log(error)
        })
    }, [1])

    // const [conversions, setConversions] = useState(props.props.chats)
    const [currentMessage, setCurrentMessage] = useState("")
    const [currentId, setCurrentId] = useState(99)
    const scrollViewRef = useRef();
    const myAvatar = "https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/258776608_431057198428909_5658719354055295907_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a5Wc5bY4iGQAX-hXpLX&tn=CbgGdwt9lgscc_i5&_nc_ht=scontent.fhan5-8.fna&oh=00_AfAtpc6D9gZL8GmiMSAbdVpxyxJK5MRfNTTd1SsAX9XAzQ&oe=63960273";
    const loveAvatar = "https://scontent.fhan5-6.fna.fbcdn.net/v/t39.30808-6/312722863_856046165431806_7133547451032615828_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cJ_R5JmlRakAX-v_Pp6&tn=CbgGdwt9lgscc_i5&_nc_ht=scontent.fhan5-6.fna&oh=00_AfCOCLT_sdVb7ZsKNRO-_1qPnMcDqRJelML_12hamhfWJA&oe=63957D0C";
    const loveIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Love_Heart_symbol.svg/2250px-Love_Heart_symbol.svg.png";
    return (<View style={appStyles.container}>
        <View style={[appStyles.bgMain, appStyles.header]}>
            <Image
                style={appStyles.userImage}
                source={{uri: myAvatar}}
            />
            <Image
                style={{width: 44, height: 40}}
                source={{uri: loveIcon}}
            />
            <Image
                style={appStyles.userImage}
                source={{uri: loveAvatar}}
            />
        </View>
        <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}
            onAccessibilityAction={() => scrollViewRef.current.scrollToEnd({animated: true})}

        >
            <View style={{flex: 1, justifyContent: "flex-end", marginBottom: 20}}>
                {props.props.chats.map(item => {

                    return (item.status === "received") ? (<Received key={item.id} text={item.message}/>) : (
                        <Send key={item.id} text={item.message}/>)
                })}
            </View>
        </ScrollView>
        <View style={[appStyles.bgMain, appStyles.footer]}>
            <Icon
                name={"add-circle"}
                size={24}
                color={"white"}
                onPress={() => {
                    alert("show")
                }}
            />
            <Icon
                name={"happy"}
                size={24}
                color={"white"}
                onPress={() => {
                    alert("show")
                }}
            />
            <Icon
                name={"image"}
                size={24}
                color={"white"}
                onPress={() => {
                    alert("show")
                }}
            />
            <TextInput
                style={appStyles.chatInput}
                value={currentMessage}
                onChangeText={r => setCurrentMessage(r)}
            />
            <Icon
                name={"md-send"}
                size={24}
                color={"white"}
                onPress={() => {
                    const baseUrl = props.props.api;
                    axios.post(baseUrl + "send", {
                        message: currentMessage, type: "text", conversation_id: 1,
                    }, {
                        headers: {Authorization: props.props.token}
                    }).then((response) => {
                        console.log(response.data)
                        const newMessage = {
                            type: "text", status: "send", message: currentMessage, id: response.data.id,
                        }
                        props.dispatch(addChat(newMessage))
                    }).catch((reason) => {
                        console.log("lỗi:" + reason)
                    })
                    setCurrentMessage("")
                }}
            />
        </View>
    </View>)
}
export default connect(state => ({props: state}))(ChatScreen);
