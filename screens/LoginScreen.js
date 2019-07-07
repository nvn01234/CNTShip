import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import Toast from "react-native-simple-toast";
import services from '@services'
import {ACTION_TO_STATE, BUTTON_TEXTS} from '@constants/LoginButtons'
import ButtonSubmit from '@components/ButtonSubmit';
import {Logo, BottomSection, AuthForm} from '@components/LoginScreen';
import Colors from '@constants/Colors'


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
            <View style={styles.container}>
                <Logo/>
                <AuthForm style={styles[`flex_${this.state.action}`]}
                          onChange={this._onFormChange}
                          showPasswordInput={this.state.showPasswordInput}
                          showConfirmPasswordInput={this.state.showConfirmPasswordInput} />
                <BottomSection style={styles[`flex_${this.state.action}`]}
                               leftAction={this.state.leftAction}
                               rightAction={this.state.rightAction}
                               switchAction={this._switchAction}/>
                <ButtonSubmit text={BUTTON_TEXTS[this.state.action]}
                              validate={this._validateForm}
                              onPress={this._submitForm}
                              onComplete={this._formSubmitCompleted}
                              style={styles[`btn_${this.state.action}`]}/>
            </View>
        );
    }

    _validateForm = () => {
        const {username, password, confirmPassword} = this.state.formData;
        if (!username) {
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
            } else {
                await this._loginSuccess(data);
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

    _loginSuccess = ({access_token}) => {
        return Promise.all([
            AsyncStorage.setItem('access_token', access_token),
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.loginBackground,
    },

    btn_register: {
        top: -135,
    },
    btn_login: {
        top: -95,
    },
    btn_resetPassword: {
        top: -95,
    },

    flex_register: {
        flex: 2,
    },
    flex_login: {
        flex: 1,
    },
    flex_resetPassword: {
        flex: 1,
    },
});