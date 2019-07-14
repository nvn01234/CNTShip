import React from 'react'
import {ScrollView, StyleSheet, Button, AsyncStorage} from 'react-native'
import {TextInput} from "react-native-paper";
import {formatNumber, formatDateTime} from '@utils'
import PaymentTypes from '@constants/PaymentTypes'
import ShipFeeTypes from "@constants/ShipFeeTypes";
import OrderStatuses from '@constants/OrderStatuses'
import services from '@services'

export default class OrderDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Chi tiết đơn',
    };

    constructor(props) {
        super(props);
        this.state = {
            order: this.props.navigation.getParam('order'),
            receiver: null,
            deliver: null,
        }
    };

    componentWillMount() {
        const {order} = this.state;
        if (order.receiver) {
            AsyncStorage.getItem('access_token').then(
                access_token => services.getProfile(access_token, order.receiver)
            ).then(data => {
                const {name} = data;
                this.setState({receiver: name})
            })
        }
        if (order.deliver) {
            AsyncStorage.getItem('access_token').then(
                access_token => services.getProfile(access_token, order.deliver)
            ).then(data => {
                const {name} = data;
                this.setState({deliver: name})
            })
        }
    }

    render() {
        const {order} = this.state;
        const canEdit = order.status === 'init';

        return (
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.input}
                    label='Mã đơn hàng'
                    value={order.order_id}
                    disabled={true}
                />
                <TextInput
                    style={styles.input}
                    label='Địa chỉ lấy hàng'
                    value={order.shop_address}
                    disabled={true}
                />
                <TextInput
                    style={styles.input}
                    label='Mô tả đơn hàng'
                    value={order.description}
                    disabled={true}
                />
                <TextInput
                    style={styles.input}
                    label='Khách hàng'
                    value={`${order.customer_name} (${order.customer_phone})`}
                    disabled={true}
                />
                <TextInput
                    style={styles.input}
                    label='Địa chỉ khách hàng'
                    value={order.customer_address}
                    disabled={true}
                />
                <TextInput
                    style={styles.input}
                    label='Giá trị đơn hàng'
                    value={`${formatNumber(order.total)} (${PaymentTypes[order.payment_type]})`}
                    disabled={true}
                />
                <TextInput
                    style={styles.input}
                    label='Phí ship'
                    value={`${formatNumber(order.ship_fee)} (${ShipFeeTypes[order.ship_fee_type]})`}
                    disabled={true}
                />
                {order.shop_note ? (<TextInput
                    style={styles.input}
                    label='Ghi chú của shop'
                    value={order.shop_note}
                    disabled={true}
                />) : null}

                <TextInput
                    style={styles.input}
                    label='Trạng thái'
                    value={OrderStatuses[order.status]}
                    disabled={true}
                />

                {this.state.receiver ? (
                    <TextInput
                        style={styles.input}
                        label='Người nhận'
                        value={this.state.receiver}
                        disabled={true}
                    />
                ): null}
                {order.received_at ? (<TextInput
                    style={styles.input}
                    label='Thời gian nhận hàng'
                    value={formatDateTime(order.received_at)}
                    disabled={true}
                />) : null}
                {order.receiver_note ? (<TextInput
                    style={styles.input}
                    label='Ghi chú của người nhận'
                    value={order.receiver_note}
                    disabled={true}
                />) : null}

                {this.state.deliver ? (
                    <TextInput
                        style={styles.input}
                        label='Người giao'
                        value={this.state.deliver}
                        disabled={true}
                    />
                ): null}
                {order.delivered_at ? (<TextInput
                    style={styles.input}
                    label='Thời gian giao hàng'
                    value={formatDateTime(order.delivered_at)}
                    disabled={true}
                />) : null}
                {order.deliverer_note ? (<TextInput
                    style={styles.input}
                    label='Ghi chú của người giao'
                    value={order.deliverer_note}
                    disabled={true}
                />) : null}

                {order.canceled_at ? (<TextInput
                    style={styles.input}
                    label='Thời gian huỷ giao'
                    value={formatDateTime(order.canceled_at)}
                    disabled={true}
                />) : null}
                {order.cancel_reasons && order.cancel_reasons.length ? (<TextInput
                    style={styles.input}
                    label='Lý do không liên hệ được'
                    value={order.cancel_reasons.map((s, i) => `(${i+1}) ${s}.`).join(' ')}
                    disabled={true}
                />): null}

                {order.return_reason ? (<TextInput
                    style={styles.input}
                    label='Lý do hoàn đơn'
                    value={order.return_reason}
                    disabled={true}
                />): null}
                {order.return_a_part_reason ? (<TextInput
                    style={styles.input}
                    label='Lý do hoàn lại 1 phần'
                    value={order.return_a_part_reason}
                    disabled={true}
                />): null}

                {/*{canEdit ? (*/}
                {/*    <Button title={'Sửa đơn'} onPress={this._gotoCreateOrderScreen}/>*/}
                {/*): null}*/}
            </ScrollView>
        )
    }

    _gotoCreateOrderScreen = () => {
        const {navigation} = this.props;
        const {order} = this.state;
        navigation.navigate('CreateOrder', {
            title: 'Sửa đơn',
            formData: {...order},
            service: 'updateOrder',
            addOrUpdateOrder: this._updateOrder,
        })
    };

    _updateOrder = (order) => {
        const newOrder = {...this.state.order, ...order};
        return navigation.getParam('addOrUpdateOrder')(newOrder);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: 'white',
    },
    buttonSubmit: {
        marginTop: 20
    }
});