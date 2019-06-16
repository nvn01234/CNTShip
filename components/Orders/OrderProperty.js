import React from 'react'
import {Icon} from "react-native-elements";
import {StyleSheet, Text, View} from "react-native";

export default class OrderProperty extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Icon
                    type='font-awesome'
                    name={this.props.iconName}
                    color={this.props.iconColor}
                    size={20}
                />
                <Text style={[styles.text, this.props.textStyle]}>{this.props.value}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 1,
    },
    text: {
        paddingLeft: 5
    }
});
