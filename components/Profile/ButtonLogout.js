import React, {Component} from 'react';
import {ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View, AsyncStorage} from 'react-native';
import {ActionConst, Actions} from 'react-native-router-flux';
import API_URL from '../../constants/API';
import Toast from 'react-native-simple-toast';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonLogout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
        this._onPress = this._onPress.bind(this);
    }

    _onPress() {
        if (this.state.isLoading) return;

        this.setState({isLoading: true});
        Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
        }).start();

        Promise.all([
            AsyncStorage.removeItem('access_token'),
            AsyncStorage.removeItem('user_profile')
        ]).then(() => {
            this._onGrow();
            Actions.loginScreen({type: ActionConst.RESET});
            this.setState({isLoading: false});
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);
        });

        // AsyncStorage.getItem('access_token').then(access_token => {
        //     fetch(API_URL.LOGOUT, {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({device_token: access_token}),
        //     }).then(response => response.json())
        //     .then(responseJson => {
        //         console.log(responseJson);
        //         if (responseJson.success) {
        //             Promise.all([
        //                 AsyncStorage.removeItem('access_token'),
        //                 AsyncStorage.removeItem('user_profile')
        //             ]).then(() => {
        //                 this._onGrow();
        //                 Actions.loginScreen();
        //                 this.setState({isLoading: false});
        //                 this.buttonAnimated.setValue(0);
        //                 this.growAnimated.setValue(0);
        //             });
        //         } else {
        //             Toast.show(responseJson.message);
        //             this.setState({isLoading: false});
        //             this.buttonAnimated.setValue(0);
        //             this.growAnimated.setValue(0);
        //         }
        //     }).catch(() => {
        //         Toast.show('Có lỗi xảy ra, vui lòng thử lại');
        //         this.setState({isLoading: false});
        //         this.buttonAnimated.setValue(0);
        //         this.growAnimated.setValue(0);
        //     });
        // });
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
                            <Text style={styles.text}>Đăng xuất</Text>
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
