import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Card, Icon} from 'react-native-elements'

export default class Order extends React.Component {
    render() {
        return (
            <TouchableOpacity
            >
            <Card style={styles.container}>
                <View style={styles.cardContentRow}>
                    <Icon
                        type='font-awesome'
                        name='map-marker'
                        color='#E74C3C'
                        size={20}
                    />
                    <Text style={styles.textAddress}>{this.props.address}</Text>
                </View>
                <View style={styles.cardContentRow}>
                    <Icon
                        type='font-awesome'
                        name='dollar'
                        color='green'
                        size={20}
                    />
                    <Text style={styles.textAmount}>{this.props.amount}</Text>
                </View>
                <View style={styles.cardContentRow}>
                    <Icon
                        type='font-awesome'
                        name='bicycle'
                        color='blue'
                        size={20}
                    />
                    <Text style={styles.textStatus}>{this.props.statusText}</Text>
                </View>
            </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textAddress: {
        paddingLeft: 5,
        fontWeight: 'bold',
    },
    textAmount: {
        paddingLeft: 5,
    },
    textStatus: {
        paddingLeft: 5,
        color: 'blue',
    },
    cardContentRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 1,
    },
});
