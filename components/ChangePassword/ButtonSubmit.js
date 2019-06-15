import React, {Component} from 'react';
import {ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import API_URL from '../../constants/API';
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
    }

    _transformAPIMsg = (message) => {
        const MESSAGE_MAP = {
            'Trường `username` được yêu cầu': 'Có lỗi xảy ra, vui lòng thử lại',
            'Trường `password` được yêu cầu': 'Vui lòng nhập mật khẩu cũ',
            'Sai username hoặc mật khẩu': 'Mật khẩu cũ không chính xác',
        };
        if (MESSAGE_MAP.hasOwnProperty(message)) {
            message = MESSAGE_MAP[message];
        }
        return message;
    };

    _onPress = async() => {
        if (this.state.isLoading) return;

        const {oldPassword, password, confirmPassword} = this.props.getFormData();

        if (!oldPassword) {
            Toast.show('Vui lòng nhập mật khẩu cũ');
            return;
        }

        if (!password) {
            Toast.show('Vui lòng nhập mật khẩu mới');
            return;
        }

        if (password !== confirmPassword) {
            Toast.show('Mật khẩu lần 2 không khớp mật khẩu lần 1');
            return;
        }

        await new Promise((resolve) => {
            this.setState({isLoading: true}, resolve);
        });
        const [, user_profile] = await Promise.all([
            new Promise((resolve) => {
                Animated.timing(this.buttonAnimated, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                }).start(resolve);
            }),
            AsyncStorage.getItem('user_profile')
        ]);

        const {username} = JSON.parse(user_profile);
        // Check mật khẩu cũ bằng cách đăng nhập
        await new Promise((resolve) => {
            fetch(API_URL.LOGIN, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password: oldPassword})
            }).then(
                response => response.json()
            ).then(responseJson => {
                console.log(responseJson);
                if (responseJson.success) {
                    // Đổi mật khẩu
                    fetch(API_URL.CHANGE_PWD, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'access-token': responseJson.data.access_token,
                        },
                        body: JSON.stringify({password}),
                    }).then(
                        response => response.json()
                    ).then(responseJson => {
                        console.log(responseJson);
                        if (responseJson.success) {
                            this._stopLoading().then(() => {
                                this.props.navigation.goBack();
                                Toast.show('Đổi mật khẩu thành công');
                                resolve();
                            });
                        } else {
                            Toast.show(responseJson.message);
                            this._stopLoading().then(() => {});
                        }
                    }).catch(() => {
                        Toast.show('Có lỗi xảy ra, vui lòng thử lại');
                        this._stopLoading().then(() => {});
                    });
                } else {
                    Toast.show(this._transformAPIMsg(responseJson.message));
                    this._stopLoading().then(() => {});
                }
            }).catch(() => {
                Toast.show('Có lỗi xảy ra, vui lòng thử lại');
                this._stopLoading().then(() => {});
            });
        });
    };

    _stopLoading() {
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
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
                            <Text style={styles.text}>Đổi mật khẩu</Text>
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
        marginTop: 17,
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
