import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import Order from "../components/Orders/Order";

export default class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Lịch sử giao nhận',
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            loadMore: false,
            children: [],
        }
    }

    loadMoreData = () => {
        if (this.state.loadMore) {
            return;
        }
        this.setState({loadMore: true}, () => {
            const nextKey = this.state.children.length + 1;
            const newChildren = [...this.state.children, {
                key: nextKey,
                address: 'Số nhà 23 ngõ 165 phố yên duyên yên sở hoàng mai hà nội - Hoàng Mai - Hà Nội',
                amount: '290(Thu hộ)|18(Shop trả)',
                timestamp: '18/06/2019 12:57 AM',
            }];
            this.setState({children: newChildren}, () => {
                this.setState({loadMore: false})
            });
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
                />
            </View>
        );
    }

    _renderItem = ({item}) => <Order
        key={item.key.toString()}
        itemAddress={item.address}
        itemAmount={item.amount}
        itemTimestamp={item.timestamp}
        gotoOrderDetailScreen={this.gotoOrderDetailScreen}
    />;

    gotoOrderDetailScreen = () => {
        this.props.navigation.navigate('OrderDetail');
    };

    _onRefresh = () => {
        this.setState({refreshing: true}, () => {
            this.setState({
                children: [
                    {
                        key: 1,
                        address: 'Số nhà 23 ngõ 165 phố yên duyên yên sở hoàng mai hà nội - Hoàng Mai - Hà Nội',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 2,
                        address: '385 trần đại nghĩa',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 3,
                        address: 'số 7 đinh tiên hoàng, hoàn kiếm, hà nội',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 4,
                        address: '43 Tràng Thi, Hoàn Kiếm, Hà Nội',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 5,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 6,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 7,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 8,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 9,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                    {
                        key: 10,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: '18/06/2019 12:57 AM',
                    },
                ]
            }, () => {
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
});