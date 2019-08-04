import React from 'react'
import {FlatList, RefreshControl, StyleSheet, View, AsyncStorage, TouchableOpacity} from 'react-native'
import {Order} from '@components/OrdersScreen'
import Toast from "react-native-simple-toast"
import OrderStatuses from '@constants/OrderStatuses'
import {orderAmountText} from '@utils'
import {Icon} from "react-native-elements"
import services from '@services'
import {EmptyComponent, LoadMoreComponent} from '@components'

export default class OrdersScreen extends React.Component {
    static navigationOptions = ({navigation}) => (
        {
            title: 'Đơn online',
            headerRight: (
                <TouchableOpacity  onPress={() => {navigation.navigate('CreateOrder', {
                    title: 'Tạo đơn',
                    addOrUpdateOrder: navigation.getParam('addOrUpdateOrder'),
                    service: 'createOrder',
                })}} style={styles.buttonAddOrder}>
                    <Icon
                        type='font-awesome'
                        name="plus-circle"
                        size={30}
                        color='#0F8FCC'
                    />
                </TouchableOpacity>
            ),
        }
    );

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            loadMore: false,
            hasMore: true,
            orders: [],
            page: 1,
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

    render = () => {
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
    };

    _keyExtractor = (item, index) => {
        return item.order_id;
    };

    _renderOrder = ({item}) => <Order
        data={item}
        itemCustomer={`${item.customer_name} (${item.customer_phone})`}
        itemAddress={item.customer_address}
        itemAmount={orderAmountText(item)}
        itemStatus={OrderStatuses[item.status]}
        onPress={this._gotoOrderDetailScreen}
    />;

    _gotoOrderDetailScreen = (order) => {
        this.props.navigation.navigate('OrderDetail', {order});
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
        };
        let response;
        try {
            response = await services.orderList(access_token, params);
        } catch (e) {
            this._errorHandler(e);
            return;
        }

        const {orders, hasMore} = response;
        const newOrders = this.state.refreshing ? orders : [...this.state.orders, ...orders];

        await new Promise((resolve) => {
            this.setState({orders: newOrders, hasMore}, resolve)
        });
    };

    _onRefresh = () => {
        return new Promise(resolve => {
            this.setState({refreshing: true, page: 1, hasMore: true}, () => {
                this._getCurrentPage().then(() => {
                    this.setState({refreshing: false}, resolve);
                });
            });
        })
    };

    _addOrder = async (newOrder) => {
        const newOrders = [newOrder, ...this.state.orders];
        await new Promise(resolve => {
            this.setState({orders: newOrders}, resolve);
        })
    };

    _updateOrder = async (order) => {
        const newOrders = this.state.orders.map(_order => {
            if (order.order_id === _order.order_id) {
                return {..._order, ...order}
            }
            return _order
        });
        await new Promise(resolve => {
            this.setState({orders: newOrders}, resolve);
        })
    };

    _addOrUpdateOrder = (order) => {
        if (this.state.orders.some(o => o.order_id === order.order_id)) {
            // Update
            return this._updateOrder(order);
        } else {
            // Add
            return this._addOrder(order);
        }
    };

    componentDidMount() {
        this.props.navigation.setParams({
            addOrUpdateOrder: this._addOrUpdateOrder,
        });
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
    buttonAddOrder: {
        marginRight: 16,
    },
    centerEmptySet: {
        justifyContent: 'center', alignItems: 'center', height: '100%'
    },
});
