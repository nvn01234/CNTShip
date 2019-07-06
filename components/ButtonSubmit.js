import React from 'react'
import {ActivityIndicator, Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.buttonAnimated = new Animated.Value(0);
    }

    render() {
        const changeWidth = this.buttonAnimated.interpolate({
            inputRange: [0, 1],
            outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
        });

        return (
            <View style={[styles.container, this.props.style || {}]}>
                <Animated.View style={{width: changeWidth}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <ActivityIndicator size="small" color="#00ff00"/>
                        ) : (
                            <Text style={styles.text}>{this.props.text}</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }

    _onPress = () => {
        if (this.state.isLoading) return;

        if (typeof this.props.validate === 'function' ? this.props.validate() : true) {
            this.setState({isLoading: true}, () => {
                Animated.timing(this.buttonAnimated, {
                    toValue: 1,
                    duration: 200,
                    easing: Easing.linear,
                }).start(() => {
                    this.props.onPress().then(() => {
                        this.buttonAnimated.setValue(0);
                        this.setState({isLoading: false}, this.props.onComplete);
                    });
                });
            });
        }
    };
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
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
