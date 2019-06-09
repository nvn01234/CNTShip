import React, {Component} from 'react';
import {ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import API from '../../constants/API';
import Toast from 'react-native-simple-toast';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
        this._loginCallback = this._loginCallback.bind(this);
    }

    _onPress() {
        if (this.state.isLoading) return;

        const formData = this.props.getFormData();
        if (this.props.action === 'signup' && formData.confirmPassword !== formData.password) {
            Toast.show('Mật khẩu lần 2 không khớp mật khẩu lần 1');
        } else {
            if (this.props.action === 'signup') {
                delete formData.confirmPassword;
            }
            this.setState({isLoading: true});
            Animated.timing(this.buttonAnimated, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
            }).start();
            this._submitForm(this.props.submitUrl, formData).then((responseJson) => {
                if (this.props.action === 'login') {
                    this._loginCallback(responseJson);
                } else if (this.props.action === 'signup') {
                    this._submitForm(API.LOGIN, formData).then(this._loginCallback);
                } else if (this.props.action === 'resetpwd') {
                    this._loginCallback(responseJson);
                }
            });
        }
    }

    _transformAPIMsg(message) {
        const regex = /^Trường `([^`]+)` được yêu cầu$/;
        const FIELD_MAP = {
            username: 'tên đăng nhập',
            password: 'mật khẩu'
        };
        if (regex.test(message)) {
            const m = regex.exec(message);
            const field = m[1];
            if (FIELD_MAP.hasOwnProperty(field)) {
                message = `Vui lòng nhập ${FIELD_MAP[field]}`;
            }
        }
        return message;
    }

    _submitForm (url, formData) {
        return new Promise((resolve) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                if (responseJson.success) {
                    resolve(responseJson);
                } else {
                    const message = this._transformAPIMsg(responseJson.message);
                    Toast.show(message);
                    this._stopLoading();
                }
            }).catch(error => {
                Toast.show("Có lỗi xảy ra, vui lòng thử lại");
                this._stopLoading();
            });
        })
    }

    _loginCallback(responseJson) {
        Promise.all([
            AsyncStorage.setItem('access_token', responseJson.data.access_token),
            AsyncStorage.removeItem('user_profile'),
        ]).then(() => {
            this._onGrow();
            Actions.loggedInScreen({type: ActionConst.RESET});
            this._stopLoading();
        });
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
    }

    _stopLoading() {
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });
        const changeScale = this.growAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, MARGIN],
        });

        return (
            <View style={{...styles.container, top: this.props.action === 'signup' ? -135 : -95}}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <ActivityIndicator size="small" color="#00ff00"/>
                        ) : (
                            <Text style={styles.text}>{this.props.submitText}</Text>
                        )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[styles.circle, {transform: [{scale: changeScale}]}]}
                    />
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // top: -135,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#127CA3',
        height: MARGIN,
        borderRadius: 20,
        zIndex: 100,
    },
    circle: {
        height: MARGIN,
        width: MARGIN,
        marginTop: -MARGIN,
        borderWidth: 1,
        borderColor: '#127CA3',
        borderRadius: 100,
        alignSelf: 'center',
        zIndex: 99,
        backgroundColor: '#127CA3',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    image: {
        width: 24,
        height: 24,
    },
});
