import React from 'react'
import {Button, StyleSheet, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

export default class ButtonAddOrder extends React.Component {
    render() {
        return (
            <TouchableOpacity  onPress={() => {}} style={styles.container}>
                <Icon
                    type='font-awesome'
                    name="plus-circle"
                    size={30}
                    color='#0F8FCC'
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 16
    }
});
