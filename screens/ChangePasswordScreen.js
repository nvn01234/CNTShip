import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native'
import {ChangePasswordForm} from '@components/ChangePasswordScreen'
import ButtonSubmit from '@components/ButtonSubmit';
import services from '@services';
import Toast from "react-native-simple-toast";


export default class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Đổi mật khẩu',
    };

    constructor(props) {
        super(props);

        this.state = {
            success: false,
            formData: {},
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ChangePasswordForm onChange={this._onFormChange}/>
                <ButtonSubmit text='Đổi mật khẩu'
                              validate={this._validateForm}
                              onPress={this._submitForm}
                              onComplete={this._formSubmitCompleted}/>
            </View>
        )
    }

    _onFormChange = (formData) => {
        this.setState({formData})
    };

    _validateForm = () => {
        const {oldPassword, newPassword, confirmNewPassword} = this.state.formData;
        if (!oldPassword) {
            this._errorHandler('Vui lòng nhập mật khẩu cũ');
            return false;
        }
        if (!newPassword) {
            this._errorHandler('Vui lòng nhập mật khẩu mới');
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            this._errorHandler('Xác nhận mật khẩu mới không khớp');
            return false;
        }
        return true;
    };

    _submitForm = async () => {
        const {oldPassword, newPassword} = this.state.formData;
        const userProfile = await AsyncStorage.getItem('user_profile');
        const {username} = JSON.parse(userProfile);

        const service = services.changePassword;
        try {
            await service({username, oldPassword, newPassword});
        } catch (message) {
            this._errorHandler(message);
            return;
        }

        await new Promise((resolve) => {
            this.setState({success: true}, resolve)
        })
    };

    _errorHandler = (message) => {
        Toast.show(message);
    };

    _formSubmitCompleted = () => {
        if (this.state.success) {
            Toast.show('Đổi mật khẩu thành công');
            this.props.navigation.goBack();
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0F8FCC',
    },
});