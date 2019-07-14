import React from 'react'
import {StyleSheet, View, AsyncStorage} from 'react-native'
import {CreateOrderForm} from '@components/CreateOrderScreen'
import services from '@services'
import Toast from "react-native-simple-toast";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputLabel: {
        marginTop: 10,
    },
});

export default class CreateOrderScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title'),
    });

    constructor(props) {
        super(props);
        const {navigation} = props;
        this.state = {
            newOrder: null,
            success: false,
            formData: navigation.getParam('formData') || {},
        }
    }

    render() {
        const {navigation} = this.props;
        return (<View style={styles.container}>
            <CreateOrderForm formData={navigation.getParam('formData') || {}}
                             title={navigation.getParam('title')}
                             onChange={this._onFormChange}
                             onSubmit={this._submitForm}
                             onSubmitComplete={this._onSubmitComplete}
                             validate={this._validateForm}/>
        </View>)
    };

    _onFormChange = (formData) => {
        this.setState({formData})
    };

    _submitForm = async () => {
        const {navigation} = this.props;
        const access_token = await AsyncStorage.getItem('access_token');

        const formData = Object.assign({}, this.state.formData);
        Object.keys(formData).filter(key => typeof formData[key] === 'string').forEach(key => {
            formData[key] = formData[key].trim()
        });

        let newOrder;
        try {
            newOrder = await services[navigation.getParam('service')](access_token, formData);
        } catch (e) {
            this._errorHandler(e);
            return;
        }
        await new Promise(resolve => {
            this.setState({success: true, newOrder}, resolve);
        })
    };

    _errorHandler = (message) => {
        Toast.show(message);
    };

    _onSubmitComplete = () => {
        const {navigation} = this.props;
        if (this.state.success) {
            Toast.show(`${navigation.getParam('title')} thành công`);
            const {navigation} = this.props;
            navigation.getParam('addOrUpdateOrder')(this.state.newOrder).then(navigation.goBack);
        }
    };

    _validateForm = () => {
        // Trim inputs
        const formData = Object.assign({}, this.state.formData);
        Object.keys(formData).forEach((key) => {
            if (typeof formData[key] === 'string') {
                formData[key] = formData[key].trim();
            }
        });

        let {
            shop_address,
            description,
            customer_name,
            customer_phone,
            customer_address,
            total,
            ship_fee,
            payment_type,
            ship_fee_type,
        } = formData;

        if (!shop_address) {
            Toast.show('Vui lòng nhập địa chỉ lấy hàng');
            return false;
        }

        if (!description) {
            Toast.show('Vui lòng nhập mô tả đơn hàng');
            return false;
        }

        if (!customer_name) {
            Toast.show('Vui lòng nhập tên người nhận');
            return false;
        }

        if (!customer_phone) {
            Toast.show('Vui lòng nhập điện thoại người nhận');
            return false;
        }

        if (!customer_address) {
            Toast.show('Vui lòng nhập địa chỉ người nhận');
            return false;
        }

        if (total === undefined || total === null) {
            Toast.show('Vui lòng nhập giá trị đơn hàng');
            return false;
        }

        if (!payment_type) {
            Toast.show('Vui lòng chọn hình thức thanh toán');
            return false;
        }

        if (ship_fee === undefined || ship_fee === null) {
            Toast.show('Vui lòng nhập phí ship');
            return false;
        }

        if (!ship_fee_type) {
            Toast.show('Vui lòng chọn hình thức thu ship');
            return false;
        }

        return true
    };
}

