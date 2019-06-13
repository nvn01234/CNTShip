import React from 'react'
import {RefreshControl, ScrollView, StyleSheet, View,} from 'react-native'
import Order from '../components/Orders/Order'

export default class OrdersScreen extends React.Component {
    static navigationOptions = {
        title: 'Đơn online',
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            children: [
                {
                    key: 1,
                    address: 'Số nhà 23 ngõ 165 phố yên duyên yên sở hoàng mai hà nội - Hoàng Mai - Hà Nội',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 2,
                    address: '385 trần đại nghĩa',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 3,
                    address: 'số 7 đinh tiên hoàng, hoàn kiếm, hà nội',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 4,
                    address: '43 Tràng Thi, Hoàn Kiếm, Hà Nội',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 5,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 6,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 7,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 8,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 9,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
                {
                    key: 10,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {this.state.children.map((child, index) => {
                        return (<Order
                            key={child.key}
                            address={child.address}
                            amount={child.amount}
                        />)
                    })}
                </ScrollView>
            </View>
        );
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false})
        }, 1000)
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 15,
    },
});
