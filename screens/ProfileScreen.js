import React from 'react';
import ProfileView from '../components/Profile/ProfileView';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Thông tin cá nhân',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ProfileView />;
  }
}
