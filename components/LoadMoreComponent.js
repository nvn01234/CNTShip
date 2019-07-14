import React from 'react'
import {StyleSheet, ActivityIndicator} from "react-native";

export default class LoadMoreComponent extends React.PureComponent {
    render() {
        if (!this.props.loading) {
            return null;
        }
        return (
            <ActivityIndicator style={styles.loadMoreIcon}/>
        );
    }
}

const styles = StyleSheet.create({
    loadMoreIcon: {
        marginTop: 20,
    },
});
