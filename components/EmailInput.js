import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TextInput, View} from 'react-native';
import emailImg from '@assets/images/email.png';

export default class EmailInput extends Component {
    render() {
        return (
            <View style={this.props.inputWrapperStyle}>
                <Image source={emailImg} style={styles.inlineImg}/>
                <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ email"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    onChangeText={this.props.onChangeText}
                    autoCompleteType='email'
                    keyboardType='email-address'
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
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        left: 35,
        top: 9,
    },
});
