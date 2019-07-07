import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {formatNumber} from '@utils'

const styles = StyleSheet.create({
    container: {
        paddingBottom: 6,
        backgroundColor: '#F4F5F4',
    },
    infoText: {
        fontSize: 16,
        marginLeft: 20,
        fontWeight: '500',
    },
});

export default class TotalText extends React.PureComponent {
    render = () => (
        <View style={styles.container}>
            <Text style={styles.infoText}>{this.props.text}: {formatNumber(this.props.value)}</Text>
        </View>
    )
}