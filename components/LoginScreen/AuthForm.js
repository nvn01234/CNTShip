import React from 'react'
import UsernameInput from '../UsernameInput'
import PasswordInput from '../PasswordInput'
import {KeyboardAvoidingView, StyleSheet} from 'react-native'

export default class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}
        };
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={[styles.container, this.props.style]}>
                <UsernameInput onChangeText={this._onChangeUsername}/>
                {this.props.showPasswordInput && (
                    <PasswordInput placeholder='Mật khẩu'
                                   onChangeText={this._onChangePassword}
                                   inputWrapperStyle={styles.inputWrapper}/>
                )}
                {this.props.showConfirmPasswordInput && (
                    <PasswordInput placeholder='Nhập lại mật khẩu'
                                   onChangeText={this._onChangeConfirmPassword}
                                   inputWrapperStyle={styles.inputWrapper}/>
                )}
            </KeyboardAvoidingView>
        )
    }

    _onChangeField = (key) => (value) => {
        const update = {};
        update[key] = value;

        const formData = Object.assign({}, this.state.formData, update);
        if (!this.props.showPasswordInput) {
            delete formData.password
        }
        if (!this.props.showConfirmPasswordInput) {
            delete formData.confirmPassword
        }

        this.setState({formData});
        this.props.onChange(formData);
    };

    _onChangeUsername = this._onChangeField('username');
    _onChangePassword = this._onChangeField('password');
    _onChangeConfirmPassword = this._onChangeField('confirmPassword');
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    inputWrapper: {
        flex: 1,
    }
});