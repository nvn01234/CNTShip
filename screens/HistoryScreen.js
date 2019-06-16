import React from 'react';
import {Animated, Platform, RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import Order from "../components/Orders/Order";

function timestamp() {
    return new Date().toLocaleDateString();
}

export default class HistoryScreen extends React.Component {
    static navigationOptions = {
        title: 'Lịch sử giao nhận',
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            scrollY: new Animated.Value(0),
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
                timestamp: timestamp(),
            }];
            this.setState({children: newChildren}, () => {
                this.setState({loadMore: false})
            });
        });
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
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
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
                    {this.state.children.map((child) => (<Order
                        key={child.key}
                        order={child}
                        orderProps={['address', 'amount', 'timestamp']}
                        navigation={this.props.navigation}
                    />))}
                </ScrollView>
            </View>
        );
    }

    _onRefresh = () => {
        this.setState({refreshing: true}, () => {
            this.setState({
                children: [
                    {
                        key: 1,
                        address: 'Số nhà 23 ngõ 165 phố yên duyên yên sở hoàng mai hà nội - Hoàng Mai - Hà Nội',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 2,
                        address: '385 trần đại nghĩa',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 3,
                        address: 'số 7 đinh tiên hoàng, hoàn kiếm, hà nội',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 4,
                        address: '43 Tràng Thi, Hoàn Kiếm, Hà Nội',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 5,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 6,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 7,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 8,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 9,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                    {
                        key: 10,
                        address: 'test',
                        amount: '290(Thu hộ)|18(Shop trả)',
                        timestamp: timestamp(),
                    },
                ]
            }, () => {
                this.setState({refreshing: false});
            });
        });
    };

    componentDidMount() {
        this._onRefresh();
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