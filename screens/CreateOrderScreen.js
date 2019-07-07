import React from 'react'
import {StyleSheet, View} from 'react-native'
import {CreateOrderForm} from '@components/CreateOrderScreen'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputLabel: {
        marginTop: 10,
    },
});

export default class CreateOrderScreen extends React.Component {
    static navigationOptions = {
        title: 'Tạo đơn',
    };

    constructor(props) {
        super(props);
        this.state = {
            formData: {},
        }
    }

    render() {
        return (<View style={styles.container}>
            <CreateOrderForm onChange={this._onFormChange}/>
        </View>)
    };

    _onFormChange = (formData) => {
        this.setState({formData})
    };
}

