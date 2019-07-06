import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {BUTTON_TEXTS} from "@constants/LoginButtons";

export default class BottomButton extends React.Component {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this._onPress}
            >
                <Text style={styles.text}>{BUTTON_TEXTS[this.props.action]}</Text>
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        this.props.onPress(this.props.action)
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
