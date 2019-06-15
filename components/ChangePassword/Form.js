import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet,} from 'react-native';
import passwordImg from '../../assets/images/password.png';
import PasswordInput from "./PasswordInput";

export default class Form extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <PasswordInput
                    source={passwordImg}
                    placeholder="Mật khẩu cũ"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={this.props.onOldPasswordChange}
                />
                <PasswordInput
                    source={passwordImg}
                    placeholder="Mật khẩu mới"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={this.props.onPasswordChange}
                />
                <PasswordInput
                    source={passwordImg}
                    placeholder="Nhập lại mật khẩu mới"
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    onChangeText={this.props.onConfirmPasswordChange}
                />
            </KeyboardAvoidingView>
        );
    }
}
