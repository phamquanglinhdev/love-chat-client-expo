import {useState} from "react";
import {Alert, Image, TextInput, View} from "react-native";
import {Button, Snackbar} from "react-native-paper";
import {connect} from "react-redux";
import {appStyles} from "../styles/appStyle";
import axios from 'axios';
import setToken from "../actions/setToken";


const LoginScreen = (props) => {
    const [load, setLoad] = useState(true)
    const [email, setEmail] = useState("Phamquanglinhdev@gmail.com")
    const [password, setPassword] = useState("Linhz123@")
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [errorMessage, setErrorMessage] = useState("Đã xảy ra lỗi");
    if (load) {
        return (<View
            style={[appStyles.container, appStyles.bgMain, {padding: 10, justifyContent: "center"}]}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
                <Image
                    style={appStyles.logo}
                    source={{uri: "https://scontent.fhan5-8.fna.fbcdn.net/v/t39.30808-6/273826441_475301180671177_5855641637158627811_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=174925&_nc_ohc=ndr4tAjAs14AX9d0Juu&_nc_ht=scontent.fhan5-8.fna&oh=00_AfCLbK6J-cVI1kpVRZudKbMcmNYLYIpJHbCwS5QK6Y_5QA&oe=639526D5"}}
                />
            </View>
            <TextInput
                value={email}
                placeholder={"Email của bạn :v"}
                onChangeText={(r) => {
                    setEmail(r)
                }}
                style={appStyles.textInput}
            />
            <TextInput
                value={password}
                placeholder={"Mật khẩu "}
                onChangeText={(r) => {
                    setPassword(r)
                }}
                secureTextEntry
                style={appStyles.textInput}
            />
            <Button
                mode={"contained"}
                buttonColor={"#FF69B4"}
                style={{borderRadius: 10, width: "70%", alignSelf: "center"}}
                onPress={() => {
                    // props.navigation.navigate("ChatScreen")
                    const baseUrl = props.props.api
                    axios.post(baseUrl + "login", {
                        email: email,
                        password: password,
                        device: props.props.device
                    }, {}).then((response) => {
                        console.log(response.data)
                        props.dispatch(setToken(response.data.token))
                        props.navigation.navigate("ChatScreen")
                    }).catch((error) => {
                        console.log(props.props.device)
                        console.log(error)
                        switch (error.toJSON().status) {
                            case 503:
                                setErrorMessage("Không có email hoặc mật khẩu")
                                break
                            case 501:
                                setErrorMessage("Không tồn tại email")
                                break
                            case 502:
                                setErrorMessage("Sai mật khẩu")
                                break
                        }
                        setVisible(true)
                    })
                }}
            >
                ĐĂNG NHẬP
            </Button>
            <Snackbar
                visible={visible}
                style={{
                    width: "100%"
                }}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Xác nhận', onPress: () => {
                        setVisible(false)
                    },
                }}>
                {errorMessage}
            </Snackbar>
        </View>)
    } else {
        return null;
    }
}
export default connect(state => ({props: state}))(LoginScreen);
