import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native'
import InfoText from "../components/Profile/InfoText";

export default class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Đổi mật khẩu',
    };

    render() {
        return (
            <View style={styles.container}>
                <InfoText text="Mật khẩu mới"/>
                <TextInput placeholder="Mật khẩu mới"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});