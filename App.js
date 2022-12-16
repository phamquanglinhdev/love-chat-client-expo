import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStore} from "redux";
import {Provider} from "react-redux";
import LoginScreen from "./src/screens/LoginScreen";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {allReducers} from "./src/reducers/allReducers";
import ChatScreen from "./src/screens/ChatScreen";
import setApi from "./src/actions/setApi";
import * as Notifications from 'expo-notifications';
import {useEffect, useRef, useState} from "react";
import * as Device from 'expo-device';
import setDevice from "./src/actions/setDevice";
import setCurrentChat from "./src/actions/setCurrentChat";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const api = "http://chat.dl-dev.site/api/"
const store = createStore(allReducers)
store.dispatch(setApi(api))
const Stack = createNativeStackNavigator();

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    return (
        <Provider store={store}>
            <View style={{padding: 15, backgroundColor: "pink"}}/>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}


async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {

        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        store.dispatch(setDevice(token))
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}
