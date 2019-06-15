import React from 'react'
import {Animated, Platform, RefreshControl, ScrollView, StyleSheet, View} from 'react-native'
import Order from '../components/Orders/Order'
import ButtonAddOrder from '../components/Orders/ButtonAddOrder'

export default class OrdersScreen extends React.Component {
    static navigationOptions = {
        title: 'Đơn online',
        headerRight: (
            <ButtonAddOrder/>
        ),
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            scrollY: new Animated.Value(0),
            loadMore: false,
            children: [
                {
                    key: 1,
                    address: 'Số nhà 23 ngõ 165 phố yên duyên yên sở hoàng mai hà nội - Hoàng Mai - Hà Nội',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 2,
                    address: '385 trần đại nghĩa',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 3,
                    address: 'số 7 đinh tiên hoàng, hoàn kiếm, hà nội',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 4,
                    address: '43 Tràng Thi, Hoàn Kiếm, Hà Nội',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 5,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 6,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 7,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 8,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 9,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
                {
                    key: 10,
                    address: 'test',
                    amount: '290(Thu hộ)|18(Shop trả)',
                    statusText: 'Đã nhận',
                },
            ]
        }
    }

    loadMoreData = async () => {
        const {loadMore} = this.state;
        if (loadMore) {
            return
        }
        this.setState({loadMore: true});
        const nextKey = this.state.children.length + 1;
        const newChildren = [...this.state.children, {
            key: nextKey,
            address: 'Số nhà 23 ngõ 165 phố yên duyên yên sở hoàng mai hà nội - Hoàng Mai - Hà Nội',
            amount: '290(Thu hộ)|18(Shop trả)',
            statusText: 'Đã nhận',
        }];
        this.setState({children: newChildren, loadMore: false});
    };

    isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        Platform.OS === 'android' ? {
                            listener: event => {
                                if (this.isCloseToBottom(event.nativeEvent)) {
                                    this.loadMoreData()
                                }
                            }
                        } : {}
                    )}
                    onMomentumScrollEnd={({nativeEvent}) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.loadMoreData()
                        }
                    }}

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
                            statusText={child.statusText}
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
