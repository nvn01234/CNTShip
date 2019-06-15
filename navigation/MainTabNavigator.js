import React from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import OrdersScreen from '../screens/OrdersScreen';
import LinksScreen from '../screens/LinksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import {fromRight} from 'react-navigation-transitions';

const OrdersStack = createStackNavigator({
  Orders: OrdersScreen,
});

OrdersStack.navigationOptions = {
  tabBarLabel: 'Đơn online',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='sticky-note'
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Lịch sử giao nhận',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='list'
    />
  ),
};

const SettingsStack = createStackNavigator({
  Profile: ProfileScreen,
  ChangePassword: ChangePasswordScreen,
}, {
  transitionConfig: () => fromRight(),
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Thông tin cá nhân',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='user'
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack: OrdersStack,
  LinksStack,
  SettingsStack,
});
