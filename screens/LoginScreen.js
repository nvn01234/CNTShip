import React from 'react';
import {StyleSheet, View} from 'react-native';
import Logo from '../components/Login/Logo';
import Form from '../components/Login/Form';
import BottomSection from '../components/Login/BottomSection';
import ButtonSubmit from '../components/Login/ButtonSubmit';

import bgSrc from '../assets/images/wallpaper.png';
import APIs from '../constants/API';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',

            current: 'login',
            leftText: 'Đăng ký',
            rightText: 'Quên mật khẩu?',
            submitText: 'Đăng nhập',
            submitUrl: APIs.LOGIN,
            showPasswordInput: true,
            showConfirmPasswordInput: false,
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.leftAction = this.leftAction.bind(this);
        this.rightAction = this.rightAction.bind(this);
    }

    render() {
        return (
            <View style={styles.container} source={bgSrc}>
                <Logo/>
                <Form onUsernameChange={this.onUsernameChange}
                      onPasswordChange={this.onPasswordChange}
                      onConfirmPasswordChange={this.onConfirmPasswordChange}
                      showPasswordInput={this.state.showPasswordInput}
                      showConfirmPasswordInput={this.state.showConfirmPasswordInput}/>
                <BottomSection leftAction={this.leftAction}
                               rightAction={this.rightAction}
                               leftText={this.state.leftText}
                               rightText={this.state.rightText}
                               action={this.state.current}/>
                <ButtonSubmit getFormData={this.getFormData}
                              submitUrl={this.state.submitUrl}
                              submitText={this.state.submitText}
                              action={this.state.current}/>
            </View>
        );
    }

    onUsernameChange(username) {
        this.setState({username})
    }

    onPasswordChange(password) {
        this.setState({password})
    }

    onConfirmPasswordChange(confirmPassword) {
        this.setState({confirmPassword})
    }

    getFormData() {
        return {
            username: this.state.username,
            ...(this.state.showPasswordInput ? {password: this.state.password} : {}),
            ...(this.state.showConfirmPasswordInput ? {confirmPassword: this.state.confirmPassword}: {}),
        }
    }

    leftAction() {
        if (this.state.current === 'login' || this.state.current === 'resetpwd') {
            this.setState({
                current: 'signup',
                leftText: 'Đăng nhập',
                rightText: 'Quên mật khẩu?',
                submitText: 'Đăng ký',
                submitUrl: APIs.SIGNUP,
                showPasswordInput: true,
                showConfirmPasswordInput: true,
            })
        } else if (this.state.current === 'signup') {
            this.setState({
                current: 'login',
                leftText: 'Đăng ký',
                rightText: 'Quên mật khẩu?',
                submitText: 'Đăng nhập',
                submitUrl: APIs.LOGIN,
                showPasswordInput: true,
                showConfirmPasswordInput: false,
            })
        }
    }

    rightAction() {
        if (this.state.current === 'login' || this.state.current === 'signup') {
            this.setState({
                current: 'resetpwd',
                leftText: 'Đăng ký',
                rightText: 'Đăng nhập',
                submitText: 'Quên mật khẩu',
                submitUrl: APIs.RESETPWD,
                showPasswordInput: false,
                showConfirmPasswordInput: false,
            })
        } else if (this.state.current === 'resetpwd') {
            this.setState({
                current: 'login',
                leftText: 'Đăng ký',
                rightText: 'Quên mật khẩu?',
                submitText: 'Đăng nhập',
                submitUrl: APIs.LOGIN,
                showPasswordInput: true,
                showConfirmPasswordInput: false,
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0F8FCC',
    },
});