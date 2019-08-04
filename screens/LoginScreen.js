import React from 'react';
import {AsyncStorage, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Toast from "react-native-simple-toast";
import services from '@services'
import {ACTION_TO_STATE} from '@constants/LoginButtons'
import {Logo, AuthForm} from '@components/LoginScreen';
import Colors from '@constants/Colors'
import {validateEmail} from '@utils'


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loginSuccess: false,
            formData: {},
            ...ACTION_TO_STATE.login,
        };
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Logo/>
                <AuthForm
                          onChange={this._onFormChange}
                          showEmailInput={this.state.showEmailInput}
                          showUsernameInput={this.state.showUsernameInput}
                          showPasswordInput={this.state.showPasswordInput}
                          showConfirmPasswordInput={this.state.showConfirmPasswordInput}
                          validateForm={this._validateForm}
                          submitForm={this._submitForm}
                          formSubmitCompleted={this._formSubmitCompleted}
                          submitAction={this.state.action}
                          leftAction={this.state.leftAction}
                          rightAction={this.state.rightAction}
                          switchAction={this._switchAction}
                />
            </KeyboardAvoidingView>
        );
    }

    _validateForm = () => {
        const {email, username, password, confirmPassword} = this.state.formData;
        if (this.state.showEmailInput) {
            if (!email) {
                Toast.show('Vui lòng nhập địa chỉ email');
                return false;
            }
            if (!validateEmail(email)) {
                Toast.show('Địa chỉ email không hợp lệ');
                return false;
            }
        }
        if (this.state.showUsernameInput && !username) {
            Toast.show('Vui lòng nhập tên đăng nhập');
            return false;
        }
        if (this.state.showPasswordInput && !password) {
            Toast.show('Vui lòng nhập mật khẩu');
            return false;
        }
        if (this.state.showConfirmPasswordInput && (password !== confirmPassword)) {
            Toast.show('Xác nhận mật khẩu không khớp');
            return false;
        }
        return true;
    };

    _submitForm = async () => {
        const service = services[this.state.action];
        const formData = this.state.formData;
        try {
            const data = await service(formData);
            if (this.state.action === 'register') {
                const loginData = await services.login(formData);
                await this._loginSuccess(loginData);
            } else if (this.state.action === 'login') {
                await this._loginSuccess(data);
            } else if (this.state.action === 'resetPassword') {
                Toast.show('Yêu cầu khôi phục mật khẩu thành công, vui lòng kiểm tra hòm thư', Toast.LONG);
            }
        } catch (message) {
            this._errorHandler(message);
        }
    };

    _formSubmitCompleted = () => {
        if (this.state.loginSuccess) {
            this.props.navigation.navigate('Main');
        }
    };

    _loginSuccess = ({access_token, refresh_token}) => {
        return Promise.all([
            AsyncStorage.setItem('access_token', access_token),
            AsyncStorage.setItem('refresh_token', refresh_token),
            AsyncStorage.removeItem('user_profile'),
        ]).then(() => {
            return new Promise((resolve) => {
                this.setState({loginSuccess: true}, resolve);
            })
        });
    };

    _errorHandler = (message) => {
        Toast.show(message);
    };

    _onFormChange = (formData) => {
        this.setState({formData})
    };

    _switchAction = (action) => {
        this.setState(ACTION_TO_STATE[action]);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.loginBackground,
    },
});