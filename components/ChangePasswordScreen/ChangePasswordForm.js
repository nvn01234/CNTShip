import React from 'react'
import {StyleSheet, KeyboardAvoidingView} from 'react-native'
import PasswordInput from '../PasswordInput'

export default class ChangePasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}
        };
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <PasswordInput placeholder='Mật khẩu cũ'
                               onChangeText={this._onChangeOldPassword}
                               inputWrapperStyle={styles.inputWrapper}/>
                <PasswordInput placeholder='Mật khẩu mới'
                               onChangeText={this._onChangeNewPassword}
                               inputWrapperStyle={styles.inputWrapper}/>
                <PasswordInput placeholder='Nhập lại mật khẩu mới'
                               onChangeText={this._onChangeConfirmNewPassword}
                               inputWrapperStyle={styles.inputWrapper}/>
            </KeyboardAvoidingView>
        )
    }

    _onChangeField = (key) => (value) => {
        const update = {};
        update[key] = value;
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };

    _onChangeOldPassword = this._onChangeField('oldPassword');
    _onChangeNewPassword = this._onChangeField('newPassword');
    _onChangeConfirmNewPassword = this._onChangeField('confirmNewPassword');
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
    },
    inputWrapper: {
        marginTop: 20,
    },
});