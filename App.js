import React from 'react'
import {StyleSheet, View, AsyncStorage} from 'react-native'
import {AppLoading, Asset, Font, Icon} from 'expo'
import { FontAwesome } from 'react-native-vector-icons';
import {Router, Scene} from "react-native-router-flux"
import LoginScreen from "./screens/LoginScreen"
import LoggedInScreen from "./screens/LoggedInScreen"


export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
        hasToken: false,
    };

    componentWillMount() {
        AsyncStorage.getItem('access_token').then((token) => {
            console.log(`Has token: ${token}`);
            this.setState({ hasToken: token !== null })
        })
    }

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <View style={styles.container}>
                    <Router>
                        <Scene key="root">
                            <Scene key="loginScreen"
                                   component={LoginScreen}
                                   animation="fade"
                                   hideNavBar={true}
                                   initial={!this.state.hasToken}
                            />
                            <Scene key="loggedInScreen"
                                   component={LoggedInScreen}
                                   animation="fade"
                                   hideNavBar={true}
                                   initial={this.state.hasToken}
                            />
                        </Scene>
                    </Router>
                </View>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./assets/images/icon.png'),
                require('./assets/images/eye_black.png'),
                require('./assets/images/username.png'),
                require('./assets/images/password.png'),
                require('./assets/images/logo.png'),
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
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
