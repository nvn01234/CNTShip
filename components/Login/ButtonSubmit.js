import React, {Component} from 'react';
import {ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
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

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();

        const formData = this.props.getFormData();
        this._submitForm(this.props.submitUrl, formData,(responseJson) => {
            if (this.props.action === 'login') {
                this._loginCallback(responseJson);
            } else if (this.props.action === 'signup') {
                this._submitForm(API.LOGIN, formData, this._loginCallback);
            } else if (this.props.action === 'resetpwd') {
                this._loginCallback(responseJson);
            }
        });
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

    _submitForm (url, formData, successCallback) {
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
                successCallback(responseJson);
            } else {
                const message = this._transformAPIMsg(responseJson.message);
                Toast.show(message);
                this.setState({isLoading: false});
                this.buttonAnimated.setValue(0);
                this.growAnimated.setValue(0);
            }
        }).catch(error => {
            Toast.show("Có lỗi xảy ra, vui lòng thử lại");
        });
    }

    _loginCallback(responseJson) {
        AsyncStorage.setItem('access_token', responseJson.data.access_token).then(() => {
            this._onGrow();
            Actions.loggedInScreen();
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        });
    }

    _onGrow() {
        Animated.timing(this.growAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();
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
            <View style={styles.container}>
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
        top: -95,
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
