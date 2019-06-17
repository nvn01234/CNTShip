import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Platform} from 'react-native';

import AppNavigator from '../navigation/AppNavigator';

export default class LoggedInScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
