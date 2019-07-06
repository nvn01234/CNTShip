import React from 'react'
import {createStackNavigator} from "react-navigation";
import ProfileScreen from "@screens/ProfileScreen";
import ChangePasswordScreen from "@screens/ChangePasswordScreen";
import {fromRight} from "react-navigation-transitions";
import TabBarIcon from "@components/TabBarIcon";

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen,
    ChangePassword: ChangePasswordScreen,
}, {
    transitionConfig: () => fromRight(),
});

ProfileStack.navigationOptions = {
    tabBarLabel: 'Thông tin cá nhân',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name='user'
        />
    ),
};

export default ProfileStack