import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Card} from 'react-native-elements'
import OrderProperty from './OrderProperty'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    status: {
        color: 'blue',
    },
    customer: {
        fontWeight: 'bold',
    },
});

const PROPS_MAP = {
    itemCustomer: {
        iconName: 'user',
        textStyle: styles.customer,
    },
    itemAddress: {
        iconName: 'map-marker',
        iconColor: '#E74C3C',
    },
    itemAmount: {
        iconName: 'dollar',
        iconColor: 'green',
    },
    itemStatus: {
        iconName: 'info',
        iconColor: 'blue',
        textStyle: styles.status,
    },
    itemTimestamp: {
        iconName: 'check',
        iconColor: 'blue',
    },
};

export default class Order extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity onPress={this.props.gotoOrderDetailScreen}>
                <Card style={styles.container}>
                    {this._renderProps()}
                </Card>
            </TouchableOpacity>
        )
    }

    _renderProps = () => Object.keys(this.props).filter(key => key.startsWith('item')).map(this._mapOrderProp);

    _mapOrderProp = (key) => <OrderProperty
        key={key}
        {...PROPS_MAP[key]}
        value={this.props[key]}
    />;
}