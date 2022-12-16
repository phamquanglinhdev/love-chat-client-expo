import {connect} from "react-redux";
import {Text, View} from "react-native";
import {appStyles} from "../styles/appStyle";

const Received = (props) => {
    return (
        <View style={appStyles.received}>
            <Text style={{color: "#FFB6C1"}}>{props.text}</Text>
        </View>
    )
}
export default Received;
