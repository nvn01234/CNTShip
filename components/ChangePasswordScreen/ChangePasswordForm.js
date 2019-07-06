import React from 'react'
import {StyleSheet} from 'react-native'
import Form from '../Form'
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
            <Form style={styles.container}>
                <PasswordInput placeholder='Mật khẩu cũ'
                               onChangeText={this._onChangeText('oldPassword')}
                               inputWrapperStyle={styles.inputWrapper}/>
                <PasswordInput placeholder='Mật khẩu mới'
                               onChangeText={this._onChangeText('newPassword')}
                               inputWrapperStyle={styles.inputWrapper}/>
                <PasswordInput placeholder='Nhập lại mật khẩu mới'
                               onChangeText={this._onChangeText('confirmNewPassword')}
                               inputWrapperStyle={styles.inputWrapper}/>
            </Form>
        )
    }

    _onChangeText = (key) => (value) => {
        const update = {};
        update[key] = value;
        const formData = Object.assign({}, this.state.formData, update);
        this.setState({formData});
        this.props.onChange(formData);
    };
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    inputWrapper: {
        marginTop: 20,
    },
});