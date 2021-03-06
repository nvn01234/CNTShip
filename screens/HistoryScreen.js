import React from 'react';
import {ActivityIndicator, AsyncStorage, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {Order} from "@components/OrdersScreen";
import Toast from "react-native-simple-toast";
import {formatNumber, formatDateTime} from "@utils";
import PaymentTypes from "@constants/PaymentTypes";
import ShipFeeTypes from "@constants/ShipFeeTypes";
import {TotalText} from "@components/HistoryScreen";
import services from '@services'
import {LoadMoreComponent, EmptyComponent} from '@components'

export default class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Lịch sử giao nhận',
    };

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            hasMore: true,
            refreshing: false,
            loadMore: false,
            orders: [],
            total: 0,
        }
    }

    _loadMoreData = () => {
        if (this.state.loadMore || this.state.refreshing || !this.state.hasMore) {
            return;
        }
        this.setState({page: this.state.page + 1, loadMore: true}, () => {
            this._getCurrentPage().then(() => {
                this.setState({loadMore: false});
            })
        });
    };

    _errorHandler = (message) => {
        Toast.show(message);
    };

    _getCurrentPage = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        const params = {
            page: this.state.page,
            per_page: 10,
            sort: 'created_at:desc',
            q: 'status:delivered',
        };
        let response;
        try {
            response = await services.orderList(access_token, params);
        } catch (e) {
            this._errorHandler(e);
            return;
        }

        const {orders, hasMore} = response;
        let newOrders = (this.state.refreshing ? orders : [...this.state.orders, ...orders]).filter(order => order !== null);
        const total = newOrders.filter(order => order.payment_type === 'cod')
                                .map(order => order.total)
                                .reduce((total, amount) => total+amount, 0);
        if (newOrders.length > 0) {
            newOrders = [null, ...newOrders]
        }

        await new Promise((resolve) => {
            this.setState({orders: newOrders, hasMore, total}, resolve)
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.4}
                    style={styles.container}
                    contentContainerStyle={[styles.contentContainer, (!this.state.refreshing && this.state.orders.length === 0) ? styles.centerEmptySet : {}]}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    data={this.state.orders}
                    renderItem={this._renderOrder}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={<LoadMoreComponent loading={this.state.loadMore}/>}
                    ListEmptyComponent={<EmptyComponent refreshing={this.state.refreshing} text='Chưa có đơn nào'/>}
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return item === null ? 'null' : item.order_id;
    };

    _renderOrder = ({item}) => {
        if (item === null) {
            return <View style={styles.totalContainer}>
                <TotalText text="Tiền chờ nhận" value={this.state.total}/>
            </View>
        } else {
            return <Order
                data={item}
                itemCustomer={`${item.customer_name} (${item.customer_phone})`}
                itemAddress={item.customer_address}
                itemAmount={`${formatNumber(item.total)} (${PaymentTypes[item.payment_type]}) | ${formatNumber(item.ship_fee)} (${ShipFeeTypes[item.ship_fee_type]})`}
                itemTimestamp={formatDateTime(item.delivered_at)}
                onPress={this._gotoOrderDetailScreen}
            />
        }
    };

    _gotoOrderDetailScreen = (order) => {
        this.props.navigation.navigate('OrderDetail', {order});
    };

    _onRefresh = () => {
        return new Promise(resolve => {
            this.setState({refreshing: true, page: 1, hasMore: true}, () => {
                this._getCurrentPage().then(() => {
                    this.setState({refreshing: false}, resolve);
                });
            });
        });

    };

    componentDidMount() {
        this._onRefresh().then(() => {});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    contentContainer: {
        paddingBottom: 15,
    },
    totalContainer: {
        marginTop: 20,
    },
    centerEmptySet: {
        justifyContent: 'center', alignItems: 'center', height: '100%'
    },
});