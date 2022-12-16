import {Text, View} from "react-native";
import {appStyles} from "../styles/appStyle";

const Send = (props) => {
    return (
        <View style={appStyles.send}>
            <Text style={{color: "white"}}>{props.text}</Text>
        </View>
    )
}
export default Send;
