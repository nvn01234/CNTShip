import React from 'react';
import {AsyncStorage, FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import Order from "../components/Orders/Order";
import API from "../constants/API";
import Toast from "react-native-simple-toast";
import utils from "../utils";
import PaymentTypes from "../constants/PaymentTypes";
import ShipFeeTypes from "../constants/ShipFeeTypes";
import TotalText from "../components/TotalText";

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
            children: [null],
            tien_da_nhan: 0,
            tien_cho_nhan: 0,
        }
    }

    loadMoreData = () => {
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

    _getCurrentPage = () => {
        return AsyncStorage.getItem('access_token').then(access_token => {
            if (access_token === null) {
                this.props.navigation.navigate('Login');
            } else {
                return fetch(`${API.ORDER_LIST}?q=status:delivered&page=${this.state.page}&per_page=10&sort=created_at:desc`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'access-token': access_token,
                    },
                }).then(
                    response => response.json()
                ).then(responseJson => {
                    if (responseJson.success) {
                        return Promise.all([
                            new Promise(resolve => {
                                const newChild = this.state.refreshing ? [null, ...responseJson.data] : [...this.state.children, ...responseJson.data];
                                this.setState({children: newChild}, resolve);
                            }),
                            new Promise(resolve => {
                                this.setState({hasMore: responseJson.paging.page < responseJson.paging.total_page}, resolve);
                            }),
                        ]);
                    } else {
                        Toast.show(responseJson.message);
                        return Promise.reject();
                    }
                }).catch(() => {
                    Toast.show("Có lỗi xảy ra, vui lòng thử lại");
                    return Promise.reject();
                });
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    onEndReached={this.loadMoreData}
                    onEndReachedThreshold={0.4}
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    data={this.state.children}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return item === null ? 'null' : item._id;
    };

    _renderItem = ({item}) => {
        if (item === null) {
            return <View style={styles.totalContainer}>
                <TotalText text="Tiền đã nhận" value={this.state.tien_da_nhan}/>
                <TotalText text="Tiền chờ nhận" value={this.state.tien_cho_nhan}/>
            </View>
        } else {
            return <Order
                itemCustomer={`${item.customer_name} (${item.customer_phone})`}
                itemAddress={item.customer_address}
                itemAmount={`${utils.formatNumber(item.total)} (${PaymentTypes[item.payment_type]}) | ${utils.formatNumber(item.ship_fee)} (${ShipFeeTypes[item.ship_fee_type]})`}
                itemTimestamp={item.delivered_at}
                gotoOrderDetailScreen={this.gotoOrderDetailScreen}
            />
        }
    };

    gotoOrderDetailScreen = () => {
        this.props.navigation.navigate('OrderDetail');
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
    totalContainer: {
        marginTop: 20,
    },
});