import React from 'react'
import {KeyboardAvoidingView, StyleSheet} from "react-native";

export default class Form extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[styles.container, this.props.style || {}]}>
                {this.props.children}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});