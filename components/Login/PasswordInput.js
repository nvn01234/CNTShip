import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import eyeImg from "../../assets/images/eye_black.png";

export default class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
        };
        this.toggleShowPass = this.toggleShowPass.bind(this);
    }

    toggleShowPass() {
        this.setState({secureTextEntry: !this.state.secureTextEntry})
    }

    render() {
        return (
            <View style={styles.inputWrapper}>
                <Image source={this.props.source} style={styles.inlineImg}/>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.state.secureTextEntry}
                    autoCorrect={this.props.autoCorrect}
                    autoCapitalize={this.props.autoCapitalize}
                    returnKeyType={this.props.returnKeyType}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onChangeText={this.props.onChangeText}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.toggleShowPass}
                >
                    <Image source={eyeImg} style={styles.iconEye}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: DEVICE_WIDTH - 40,
        height: 40,
        marginHorizontal: 20,
        paddingLeft: 45,
        borderRadius: 20,
        color: '#ffffff',
    },
    inputWrapper: {
        flex: 1,
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
    btnEye: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        right: 35,
        top: 9,
    },
    iconEye: {
        width: 22,
        height: 22,
        tintColor: 'rgba(0,0,0,0.2)',
    }
});
