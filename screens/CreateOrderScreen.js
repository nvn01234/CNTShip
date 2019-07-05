import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Input } from 'react-native-elements'
import { TextInput } from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputLabel: {
        marginTop: 10,
    },
});

export default class CreateOrderScreen extends React.Component {
    static navigationOptions = {
        title: 'Tạo đơn',
    };

    render() {
        return (<View style={styles.container}>
            <TextInput
                label='Email'
            />
        </View>)
    };
}

