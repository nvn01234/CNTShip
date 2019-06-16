import React from 'react';
import {AsyncStorage, RefreshControl, ScrollView, StyleSheet} from 'react-native';
import Toast from "react-native-simple-toast";
import {Actions} from 'react-native-router-flux';
import API from '../constants/API';
import ButtonLogout from '../components/Profile/ButtonLogout';
import {ListItem} from 'react-native-elements';
import InfoText from '../components/Profile/InfoText';
import Chevron from '../components/Profile/Chevron';

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
        this.setState({refreshing: true});
        AsyncStorage.getItem('access_token').then(access_token => {
            if (access_token === null) {
                Actions.loginScreen();
            } else {
                fetch(API.USER_PROFILE + '?fields=', {
                    method: 'GET',
                    headers: {
                        'access-token': access_token,
                    },
                }).then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson);
                        if (responseJson.success) {
                            AsyncStorage.setItem('user_profile', JSON.stringify(responseJson.data)).then(() => {
                                this.setState({user_profile: responseJson.data, refreshing: false});
                            });
                        } else {
                            Toast.show(responseJson.message);
                            this.setState({refreshing: false});
                        }
                    }).catch(() => {
                    Toast.show("Có lỗi xảy ra, vui lòng thử lại");
                    this.setState({refreshing: false});
                });
            }
        });
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
                <InfoText text="Tên đăng nhập"/>
                <ListItem
                    hideChevron
                    title={this.state.user_profile ? this.state.user_profile.username : ''}
                    containerStyle={styles.listItemContainer}
                />
                <InfoText text="Mật khẩu"/>
                <ListItem
                    title={this.state.user_profile ? '**********' : ''}
                    containerStyle={styles.listItemContainer}
                    onPress={() => {this.props.navigation.navigate('ChangePassword')}}
                    rightIcon={<Chevron/>}
                />
                <InfoText text="Giới tính"/>
                <ListItem
                    title={this.state.user_profile ? this.state.user_profile.sex : ''}
                    containerStyle={styles.listItemContainer}
                    rightIcon={<Chevron/>}
                />
                <ButtonLogout/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
    },
});
