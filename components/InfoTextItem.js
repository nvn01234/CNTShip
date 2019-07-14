import React from 'react'
import {StyleSheet, View} from 'react-native'
import InfoText from './InfoText'
import {ListItem} from "react-native-elements";


export default class InfoTextItem extends React.PureComponent {
    render() {
        const {infoText, ...props} = this.props;
        return (
            <View>
                <InfoText text={infoText}/>
                <ListItem
                    containerStyle={styles.listItemContainer}
                    {...props}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },
});
