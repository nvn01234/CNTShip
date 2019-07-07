import React from 'react'
import {TextInput, RadioButton } from 'react-native-paper'
import { StyleSheet, View} from "react-native";
import Colors from '@constants/Colors'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {formatNumber} from "@utils";

export default class CreateOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            totalText: '',
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}
                                     enableOnAndroid={true}
                                     enableAutoAutomaticScroll={true}
                                     extraScrollHeight={100}
                                     viewIsInsideTabBar={true}>
                <View>
                    <TextInput
                        style={styles.input}
                        label='Địa chỉ lấy hàng'
                        value={this.state.formData.shop_address}
                        onChangeText={this._onChangeText('shop_address')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Mô tả đơn hàng'
                        value={this.state.formData.description}
                        onChangeText={this._onChangeText('description')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Họ tên người nhận'
                        value={this.state.formData.customer_name}
                        onChangeText={this._onChangeText('customer_name')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Điện thoại người nhận'
                        value={this.state.formData.customer_phone}
                        onChangeText={this._onCustomerPhoneChanged}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={styles.input}
                        label='Địa chỉ người nhận'
                        value={this.state.formData.customer_address}
                        onChangeText={this._onChangeText('customer_address')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Giá trị đơn hàng'
                        value={this.state.formData.total ? formatNumber(this.state.formData.total) : ''}
                        onChangeText={this._onAmountChanged('total')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={styles.input}
                        label='Phí ship'
                        value={this.state.formData.ship_fee ? formatNumber(this.state.formData.ship_fee) : ''}
                        onChangeText={this._onAmountChanged('ship_fee')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                        keyboardType={'numeric'}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }

    _onChangeText = (key) => (value) => {
        const update = {};
        update[key] = value;
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };

    _onCustomerPhoneChanged = (customer_phone) => {
        customer_phone = customer_phone.replace(/[^0-9]/g, '');
        const update = {customer_phone};
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };

    _onAmountChanged = (key) => (amount) => {
        amount = amount.replace(/[^0-9]/g, '');
        amount = amount ? parseInt(amount) : 0;
        const update = {};
        update[key] = amount;
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: 'white',
    }
});