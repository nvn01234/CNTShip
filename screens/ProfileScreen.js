import React from 'react';
import {AsyncStorage, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import Toast from "react-native-simple-toast";
import {InfoTextItem, Chevron, ButtonSubmit} from '@components'
import services from '@services'

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Thông tin cá nhân',
    };

    constructor(props) {
        super(props);
        this.state = {
            user_profile: null,
            refreshing: false,
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('user_profile').then(user_profile => {
            if (user_profile === null) {
                this._onRefresh();
            } else {
                this.setState({user_profile: JSON.parse(user_profile)})
            }
        });
    }

    _onRefresh = () => {
        if (this.state.refreshing) {
            return;
        }

        this.setState({refreshing: true}, () => {
            AsyncStorage.getItem('access_token').then(access_token => {
                return services.myProfile(access_token);
            }).catch(this._errorHandler).then(user_profile => {
                return AsyncStorage.setItem('user_profile', JSON.stringify(user_profile)).then(() => {
                    return new Promise(resolve => {
                        this.setState({user_profile}, resolve)
                    })
                });
            }).then(() => {
                this.setState({refreshing: false})
            });
        });
    };

    _errorHandler = (message) => {
        Toast.show(message);
    };

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <InfoTextItem
                    infoText={"Tên đăng nhập"}
                    hideChevron
                    title={this.state.user_profile ? this.state.user_profile.username : ''}
                />
                <InfoTextItem
                    infoText={"Mật khẩu"}
                    title={this.state.user_profile ? '**********' : ''}
                    onPress={this._gotoChangePasswordScreen}
                    rightIcon={<Chevron/>}
                />
                <ButtonSubmit style={styles.buttonLogout}
                              text='Đăng xuất'
                              onPress={this._logout}
                              onComplete={this._gotoLoginScreen}/>
            </ScrollView>
        );
    }

    _logout = () => {
        return Promise.all([
            AsyncStorage.removeItem('access_token'),
            AsyncStorage.removeItem('refresh_token'),
            AsyncStorage.removeItem('user_profile'),
        ]);
    };

    _gotoLoginScreen = () => {
        this.props.navigation.navigate('Login');
    };

    _gotoChangePasswordScreen = () => {
        this.props.navigation.navigate('ChangePassword');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonLogout: {
        marginTop: 17,
    }
});
