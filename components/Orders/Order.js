import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Card, Icon, ListItem } from 'react-native-elements'

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
                    />
                    <Text style={styles.text}>{this.props.address}</Text>
                </View>
                <View style={styles.cardContentRow}>
                    <Icon
                        type='font-awesome'
                        name='dollar'
                        color='green'
                    />
                    <Text style={styles.text}>{this.props.amount}</Text>
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
    text: {
        paddingLeft: 5,
    },
    cardContentRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
        marginBottom: 1,
    },
});
