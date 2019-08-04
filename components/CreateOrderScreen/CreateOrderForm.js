import React from 'react'
import {TextInput, RadioButton } from 'react-native-paper'
import { StyleSheet, View, Text} from "react-native";
import Colors from '@constants/Colors'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {formatNumber} from "@utils";
import PaymentTypes from '@constants/PaymentTypes'
import ShipFeeTypes from "@constants/ShipFeeTypes";
import ButtonSubmit from '@components/ButtonSubmit'

export default class CreateOrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {...props.formData},
            totalText: '',
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}
                                     style={styles.container}
                                     enableOnAndroid={true}
                                     enableAutoAutomaticScroll={true}
                                     extraScrollHeight={120}
                                     viewIsInsideTabBar={true}>
                <View>
                    <TextInput
                        style={styles.input}
                        label='Địa chỉ lấy hàng'
                        value={this.state.formData.shop_address}
                        onChangeText={this._onChangeShopAddress}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Mô tả đơn hàng'
                        value={this.state.formData.description}
                        onChangeText={this._onChangeDescription}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Tên người nhận'
                        value={this.state.formData.customer_name}
                        onChangeText={this._onChangeCustomerName}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <TextInput
                        style={styles.input}
                        label='Điện thoại người nhận'
                        value={this.state.formData.customer_phone}
                        onChangeText={this._onChangeCustomerPhone}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                        keyboardType={'numeric'}
                    />
                    <TextInput
                        style={styles.input}
                        label='Địa chỉ người nhận'
                        value={this.state.formData.customer_address}
                        onChangeText={this._onChangeCustomerAddress}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <View style={styles.inline}>
                        <TextInput
                            style={[styles.input, styles.flex2]}
                            label='Giá trị đơn hàng'
                            value={typeof this.state.formData.total === 'number' ? formatNumber(this.state.formData.total) : ''}
                            onChangeText={this._onChangeTotal}
                            underlineColor={Colors.inputUnderline}
                            selectionColor={Colors.inputSelection}
                            keyboardType={'numeric'}
                        />
                        <View style={styles.radioGroup}>
                            <RadioButton.Group
                                onValueChange={this._onChangePaymentType}
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
                            value={typeof this.state.formData.ship_fee === 'number' ? formatNumber(this.state.formData.ship_fee) : ''}
                            onChangeText={this._onChangeShipFee}
                            underlineColor={Colors.inputUnderline}
                            selectionColor={Colors.inputSelection}
                            keyboardType={'numeric'}
                        />
                        <View style={styles.radioGroup}>
                            <RadioButton.Group
                                onValueChange={this._onChangeShipFeeType}
                                value={this.state.formData.ship_fee_type}
                            >
                                {this._renderRadioButtons(ShipFeeTypes)}
                            </RadioButton.Group>
                        </View>
                    </View>
                    <TextInput
                        style={styles.input}
                        label='Ghi chú'
                        value={this.state.formData.shop_note}
                        onChangeText={this._onChangeShopNote}
                        underlineColor={Colors.inputUnderline}
                        selectionColor={Colors.inputSelection}
                    />
                    <ButtonSubmit text={this.props.title}
                                  style={styles.buttonSubmit}
                                  onPress={this.props.onSubmit}
                                  onComplete={this.props.onSubmitComplete}
                                  validate={this.props.validate}/>
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

    _onChangeField = (key, formatter=null) => (value) => {
        if (typeof formatter === 'function') {
            value = formatter(value);
        }

        const update = {};
        update[key] = value;
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };

    _amountFormatter = amount => {
        amount = amount.replace(/[^0-9]/g, '');
        amount = amount ? parseInt(amount) : null;
        return amount;
    };

    _onChangeShopAddress = this._onChangeField('shop_address');
    _onChangeDescription = this._onChangeField('description');
    _onChangeCustomerName = this._onChangeField('customer_name');
    _onChangeCustomerPhone = this._onChangeField('customer_phone', customer_phone => customer_phone.replace(/[^0-9]/g, ''));
    _onChangeCustomerAddress = this._onChangeField('customer_address');
    _onChangeTotal = this._onChangeField('total', this._amountFormatter);
    _onChangePaymentType = this._onChangeField('payment_type');
    _onChangeShipFee = this._onChangeField('ship_fee', this._amountFormatter);
    _onChangeShipFeeType = this._onChangeField('ship_fee_type');
    _onChangeShopNote = this._onChangeField('shop_note');
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
    buttonSubmit: {
        marginTop: 20
    }
});