import React from 'react'
import {FlatList, RefreshControl, StyleSheet, View, AsyncStorage, TouchableOpacity} from 'react-native'
import {Order} from '@components/OrdersScreen'
import Toast from "react-native-simple-toast"
import OrderStatuses from '@constants/OrderStatuses'
import PaymentTypes from '@constants/PaymentTypes'
import ShipFeeTypes from '@constants/ShipFeeTypes'
import {formatNumber} from '@utils'
import {Icon} from "react-native-elements"
import services from '@services'

export default class OrdersScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'Đơn online',
        headerRight: (
            <TouchableOpacity  onPress={() => {navigation.navigate('CreateOrder')}} style={styles.buttonAddOrder}>
                <Icon
                    type='font-awesome'
                    name="plus-circle"
                    size={30}
                    color='#0F8FCC'
                />
            </TouchableOpacity>
        ),
    });

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
        if (this.state.loadMore) {
            return;
        }
        if (!this.state.hasMore) {
            return;
        }
        this.setState({page: this.state.page + 1, loadMore: true}, () => {
            this._getCurrentPage().then(() => {
                this.setState({loadMore: false});
            })
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    onEndReached={this._loadMoreData}
                    onEndReachedThreshold={0.4}
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    data={this.state.orders}
                    renderItem={this._renderOrder}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return item._id;
    };

    _renderOrder = ({item}) => <Order
        itemCustomer={`${item.customer_name} (${item.customer_phone})`}
        itemAddress={item.customer_address}
        itemAmount={`${formatNumber(item.total)} (${PaymentTypes[item.payment_type]}) | ${formatNumber(item.ship_fee)} (${ShipFeeTypes[item.ship_fee_type]})`}
        itemStatus={OrderStatuses[item.status]}
        onPress={this._gotoOrderDetailScreen}
    />;

    _gotoOrderDetailScreen = () => {
        this.props.navigation.navigate('OrderDetail');
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
        this.setState({refreshing: true, page: 1, hasMore: true}, () => {
            this._getCurrentPage().then(() => {
                this.setState({refreshing: false});
            });
        });
    };

    componentDidMount() {
        this.setState({refreshing: true}, () => {
            this.initialList = setTimeout(this._onRefresh, 1);
        })
    }

    componentWillUnmount() {
        if (this.initialList) {
            clearTimeout(this.initialList);
        }
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
    }
});
