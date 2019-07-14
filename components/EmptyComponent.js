import React from 'react'
import {Text} from 'react-native'

export default class EmptyComponent extends React.PureComponent {
    render() {
        if (this.props.refreshing) {
            return null;
        }
        return (
            <Text>{this.props.text}</Text>
        )
    }
}
