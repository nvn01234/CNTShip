import React from 'react';
import {StyleSheet, View} from 'react-native'
import Form from '../components/ChangePassword/Form'
import ButtonSubmit from '../components/ChangePassword/ButtonSubmit';


export default class ChangePasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Đổi mật khẩu',
    };

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            password: '',
            confirmPassword: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Form
                    onOldPasswordChange={this.onOldPasswordChange}
                    onPasswordChange={this.onPasswordChange}
                    onConfirmPasswordChange={this.onConfirmPasswordChange}/>
                <ButtonSubmit getFormData={this.getFormData}/>
            </View>
        )
    }

    onOldPasswordChange = (oldPassword) => {
        this.setState({oldPassword});
    };

    onPasswordChange = (password) => {
        this.setState({password})
    };

    onConfirmPasswordChange = (confirmPassword) => {
        this.setState({confirmPassword})
    };

    getFormData = () => {
        return this.state
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#0F8FCC',
    },
});