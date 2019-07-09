import React from 'react'
import {TextInput, RadioButton } from 'react-native-paper'
import { StyleSheet, View, Text} from "react-native";
import Colors from '@constants/Colors'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {formatNumber} from "@utils";
import PaymentTypes from '@constants/PaymentTypes'
import ShipFeeTypes from "@constants/ShipFeeTypes";

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
                                     extraScrollHeight={120}
                                     viewIsInsideTabBar={true}>
                <View>
                    <TextInput
                        style={styles.input}
                        label='Địa chỉ lấy hàng'
                        value={this.state.formData.shop_address}
                        onChangeText={this._onChangeField('shop_address')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Mô tả đơn hàng'
                        value={this.state.formData.description}
                        onChangeText={this._onChangeField('description')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Họ tên người nhận'
                        value={this.state.formData.customer_name}
                        onChangeText={this._onChangeField('customer_name')}
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
                        onChangeText={this._onChangeField('customer_address')}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <View style={styles.inline}>
                        <TextInput
                            style={[styles.input, styles.flex2]}
                            label='Giá trị đơn hàng'
                            value={this.state.formData.total ? formatNumber(this.state.formData.total) : ''}
                            onChangeText={this._onAmountChanged('total')}
                            underlineColor={Colors.inputUnderline}
                            selectionColor={Colors.inputSelection}
                            keyboardType={'numeric'}
                        />
                        <View style={styles.radioGroup}>
                            <RadioButton.Group
                                onValueChange={this._onChangeField('payment_type')}
                                value={this.state.formData.payment_type}
                            >
                                {this._renderRadioButtons(PaymentTypes)}
                            </RadioButton.Group>
                        </View>
                    </View>
                    <View style={styles.inline}>
                        <TextInput
                            style={[styles.input, styles.flex2]}
                            label='Phí ship'
                            value={this.state.formData.ship_fee ? formatNumber(this.state.formData.ship_fee) : ''}
                            onChangeText={this._onAmountChanged('ship_fee')}
                            underlineColor={Colors.inputUnderline}
                            selectionColor={Colors.inputSelection}
                            keyboardType={'numeric'}
                        />
                        <View style={styles.radioGroup}>
                            <RadioButton.Group
                                onValueChange={this._onChangeField('ship_fee_type')}
                                value={this.state.formData.ship_fee_type}
                            >
                                {this._renderRadioButtons(ShipFeeTypes)}
                            </RadioButton.Group>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    _renderRadioButtons = (options) => Object.keys(options).map((option) => (
        <View key={option} style={styles.inline}>
            <RadioButton value={option}/>
            <Text style={styles.radioLabel}>{options[option]}</Text>
        </View>
    ));

    _onChangeField = (key) => (value) => {
        const update = {};
        update[key] = value;
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };

    _onCustomerPhoneChanged = (customer_phone) => {
        customer_phone = customer_phone.replace(/[^0-9]/g, '');
        this._onChangeField('customer_phone')(customer_phone);
    };

    _onAmountChanged = (key) => (amount) => {
        amount = amount.replace(/[^0-9]/g, '');
        amount = amount ? parseInt(amount) : 0;
        this._onChangeField(key)(amount);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        backgroundColor: 'white',
    },
    flex2: {
        flex: 2,
    },
    inline: {
        flexDirection: 'row',
    },
    radioGroup: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
    },
    radioLabel: {
        marginTop: 8,
    },
});