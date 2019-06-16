import React, {Component} from 'react';
import {
    ActivityIndicator,
    Animated,
    AsyncStorage,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {ActionConst, Actions} from 'react-native-router-flux';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonLogout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
    }

    _onPress = () => {
        if (this.state.isLoading) return;
        this.setState({isLoading: true}, () => {
            Animated.timing(this.buttonAnimated, {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
            }).start(() => {
                Promise.all([
                    AsyncStorage.removeItem('access_token'),
                    AsyncStorage.removeItem('user_profile')
                ]).then(() => {
                    return this._stopLoading();
                }).then(() => {
                    Actions.loginScreen({type: ActionConst.RESET});
                })
            });
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
