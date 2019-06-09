import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class BottomSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{...styles.container, flex: this.props.action === 'signup' ? 2: 1}}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.props.leftAction}
                >
                    <Text style={styles.text}>{this.props.leftText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.props.rightAction}
                >
                    <Text style={styles.text}>{this.props.rightText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        // flex: 2,
        top: 65,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
