import React from 'react';
import { Platform, Easing } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import OrdersScreen from '../screens/OrdersScreen';
import LinksScreen from '../screens/LinksScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import { fromLeft, fromRight } from 'react-navigation-transitions';

const HomeStack = createStackNavigator({
  Home: OrdersScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Đơn online',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
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
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
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
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
