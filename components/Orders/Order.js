import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Card} from 'react-native-elements'
import OrderProperty from './OrderProperty'

export default class Order extends React.Component {
    render() {
        const PROPS_MAP = {
            address: {
                iconName: 'map-marker',
                iconColor: '#E74C3C',
                textStyle: styles.address,
            },
            amount: {
                iconName: 'dollar',
                iconColor: 'green',
            },
            statusText: {
                iconName: 'bicycle',
                iconColor: 'blue',
                textStyle: styles.statusText,
            },
            timestamp: {
                iconName: 'check',
                iconColor: 'blue',
            }
        };

        return (
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('OrderDetail')}}>
                <Card style={styles.container}>
                    {this.props.orderProps.map((prop) => (<OrderProperty
                        key={prop}
                        {...PROPS_MAP[prop]}
                        value={this.props.order[prop]}
                    />))}
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    address: {
        fontWeight: 'bold',
    },
    statusText: {
        color: 'blue',
    }
});
