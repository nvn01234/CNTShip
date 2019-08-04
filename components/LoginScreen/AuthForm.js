import React from 'react'
import EmailInput from '../EmailInput'
import UsernameInput from '../UsernameInput'
import PasswordInput from '../PasswordInput'
import {StyleSheet, View} from 'react-native'
import ButtonSubmit from '@components/ButtonSubmit';
import {BUTTON_TEXTS} from '@constants/LoginButtons'
import BottomSection from './BottomSection'


export default class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}
        };
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.showEmailInput && (
                    <EmailInput onChangeText={this._onChangeEmail} inputWrapperStyle={styles.inputWrapper}/>
                )}
                {this.props.showUsernameInput && (
                    <UsernameInput onChangeText={this._onChangeUsername} inputWrapperStyle={styles.inputWrapper}/>
                )}
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
                <ButtonSubmit text={BUTTON_TEXTS[this.props.submitAction]}
                              validate={this.props.validateForm}
                              onPress={this.props.submitForm}
                              onComplete={this.props.formSubmitCompleted}
                              />
                <BottomSection leftAction={this.props.leftAction}
                               rightAction={this.props.rightAction}
                               switchAction={this.props.switchAction}/>
            </View>
        )
    }

    _onChangeField = (key) => (value) => {
        const update = {};
        update[key] = value;

        const formData = Object.assign({}, this.state.formData, update);
        if (!this.props.showEmailInput) {
            delete formData.email
        }
        if (!this.props.showUsernameInput) {
            delete formData.username
        }
        if (!this.props.showPasswordInput) {
            delete formData.password
        }
        if (!this.props.showConfirmPasswordInput) {
            delete formData.confirmPassword
        }

        this.setState({formData});
        this.props.onChange(formData);
    };

    _onChangeEmail = this._onChangeField('email');
    _onChangeUsername = this._onChangeField('username');
    _onChangePassword = this._onChangeField('password');
    _onChangeConfirmPassword = this._onChangeField('confirmPassword');
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    inputWrapper: {
        height: 40,
        marginBottom: 10,
    }
});