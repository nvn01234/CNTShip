import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet,} from 'react-native';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
import UserInput from './UserInput';
import PasswordInput from "./PasswordInput";

export default class Form extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <UserInput
                    source={usernameImg}
                    placeholder="Tên đăng nhập"
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    onChangeText={this.props.onUsernameChange}
                />
                {this.props.showPasswordInput ? (
                    <PasswordInput
                        source={passwordImg}
                        placeholder="Mật khẩu"
                        returnKeyType={'done'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        onChangeText={this.props.onPasswordChange}
                    />
                ): null}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});
