import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import eyeImg from "@assets/images/eye_black.png";
import passwordImg from '@assets/images/password.png';

export default class PasswordInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secureTextEntry: true,
        };
    }

    toggleShowPass = () => {
        this.setState({secureTextEntry: !this.state.secureTextEntry})
    };

    render() {
        return (
            <View style={this.props.inputWrapperStyle}>
                <Image source={passwordImg} style={styles.inlineImg}/>
                <TextInput
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    secureTextEntry={this.state.secureTextEntry}
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
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
