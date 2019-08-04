import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import BottomButton from './BottomButton'

export default class BottomSection extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style || {}]}>
                <BottomButton action={this.props.leftAction} onPress={this.props.switchAction}/>
                <BottomButton action={this.props.rightAction} onPress={this.props.switchAction}/>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignItems: 'center',
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        color: 'white',
        backgroundColor: 'transparent',
    },
});
