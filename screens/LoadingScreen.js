import React from 'react'
import {StyleSheet, View, AsyncStorage, ActivityIndicator, StatusBar} from 'react-native'
import {AppLoading, Asset, Font, Icon} from 'expo'
import { FontAwesome } from 'react-native-vector-icons';


export default class LoadingScreen extends React.Component {
    state = {
        hasToken: false,
    };

    componentDidMount() {
        AsyncStorage.getItem('access_token').then(token => {
            console.log(`token: ${token}`);
            this.setState({ hasToken: token !== null });
        });
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            </View>
        )
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('../assets/images/icon.png'),
                require('../assets/images/eye_black.png'),
                require('../assets/images/username.png'),
                require('../assets/images/password.png'),
                require('../assets/images/logo.png'),
            ]),
            Font.loadAsync({
                ...FontAwesome.font,
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.props.navigation.navigate(this.state.hasToken ? 'Main': 'Login')
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
