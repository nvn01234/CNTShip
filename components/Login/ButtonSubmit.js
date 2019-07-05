import React, {Component} from 'react';
import {ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import Toast from 'react-native-simple-toast';
import services from '@services'

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
    }

    _getServiceFromAction = () => {
        switch (this.props.action) {
            case 'login': return services.login;
            case 'signup': return services.register;
            case 'resetpwd': return services.resetPassword;
            default: return null;
        }
    };

    _onPress = () => {
        if (this.state.isLoading) return;

        const formData = this.props.getFormData();
        if (this.props.action === 'signup' && formData.confirmPassword !== formData.password) {
            Toast.show('Mật khẩu lần 2 không khớp mật khẩu lần 1');
            return;
        }

        if (this.props.action === 'signup') {
            delete formData.confirmPassword;
        }
        this.setState({isLoading: true}, () => {
            Animated.timing(this.buttonAnimated, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
            }).start(() => {
                const service = this._getServiceFromAction();
                service(formData).then((data) => {
                    if (this.props.action === 'signup') {
                        services.login(formData).then((loginData) => {
                            this._loginCallback(loginData);
                        }).catch(this._errorHandler);
                    } else {
                        this._loginCallback(data);
                    }
                }).catch(this._errorHandler);
            });
        });
    };

    _errorHandler = (message) => {
        Toast.show(message);
        return this._stopLoading();
    };

    _transformAPIMsg = (message) => {
        const MESSAGE_MAP = {
            'Trường `username` được yêu cầu': 'Vui lòng nhập tên đăng nhập',
            'Trường `password` được yêu cầu': 'Vui lòng nhập mật khẩu',
            'Sai username hoặc mật khẩu': 'Sai tên đăng nhập hoặc mật khẩu',
        };
        if (MESSAGE_MAP.hasOwnProperty(message)) {
            message = MESSAGE_MAP[message];
        }
        return message;
    };

    _submitForm = (service, formData) => {
        return new Promise((resolve) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.success) {
                    resolve(responseJson);
                } else {
                    const message = this._transformAPIMsg(responseJson.message);
                    Toast.show(message);
                    this._stopLoading().then(() => {});
                }
            }).catch(() => {
                Toast.show("Có lỗi xảy ra, vui lòng thử lại");
                this._stopLoading().then(() => {});
            });
        })
    };

    _loginCallback = ({access_token}) => {
        Promise.all([
            AsyncStorage.setItem('access_token', access_token),
            AsyncStorage.removeItem('user_profile'),
        ]).then(() => {
            return this._stopLoading();
        }).then(() => {
            this.props.navigateToMain();
        });
    };

    _stopLoading = () => {
        return new Promise(resolve => {
            this.buttonAnimated.setValue(0);
            this.setState({isLoading: false}, resolve);
        });
    };

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
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
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
