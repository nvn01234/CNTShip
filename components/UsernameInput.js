import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import usernameImg from '@assets/images/username.png';

export default class UserInput extends Component {
    render() {
        return (
            <View style={styles.inputWrapper}>
                <Image source={usernameImg} style={styles.inlineImg}/>
                <TextInput
                    style={styles.input}
                    placeholder="Tên đăng nhập"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onChangeText={this.props.onChangeText}
                />
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
});
