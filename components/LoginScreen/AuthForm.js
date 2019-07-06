import React from 'react'
import Form from '../Form'
import UsernameInput from '../UsernameInput'
import PasswordInput from '../PasswordInput'
import {StyleSheet} from 'react-native'

export default class AuthForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formData: {}
        };
    }

    render() {
        return (
            <Form style={this.props.style}>
                <UsernameInput onChangeText={this._onChangeText('username')}/>
                {this.props.showPasswordInput && (
                    <PasswordInput placeholder='Mật khẩu'
                                   onChangeText={this._onChangeText('password')}
                                   inputWrapperStyle={styles.inputWrapper}/>
                )}
                {this.props.showConfirmPasswordInput && (
                    <PasswordInput placeholder='Nhập lại mật khẩu'
                                   onChangeText={this._onChangeText('confirmPassword')}
                                   inputWrapperStyle={styles.inputWrapper}/>
                )}
            </Form>
        )
    }

    _onChangeText = (key) => (value) => {
        const update = {};
        update[key] = value;

        const formData = Object.assign({}, this.state.formData, update);
        if (!this.props.showPasswordInput) {
            delete formData.password
        }
        if (!this.props.showConfirmPasswordInput) {
            delete formData.confirmPassword
        }

        this.setState({formData});
        this.props.onChange(formData);
    };
}

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
    }
});