import React from 'react'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import OrdersScreen from '../screens/OrdersScreen'
import HistoryScreen from '../screens/HistoryScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ChangePasswordScreen from "../screens/ChangePasswordScreen"
import OrderDetailScreen from '../screens/OrderDetailScreen'
import {fromRight} from 'react-navigation-transitions'
import CreateOrderScreen from "../screens/CreateOrderScreen";

const OrdersStack = createStackNavigator({
  Orders: OrdersScreen,
  OrderDetail: OrderDetailScreen,
  CreateOrder: CreateOrderScreen,
}, {
  transitionConfig: () => fromRight()
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

const HistoryStack = createStackNavigator({
  History: HistoryScreen,
  OrderDetail: OrderDetailScreen,
}, {
  transitionConfig: () => fromRight()
});

HistoryStack.navigationOptions = {
  tabBarLabel: 'Lịch sử giao nhận',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='list'
    />
  ),
};

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

export default createBottomTabNavigator({
  OrdersStack,
  HistoryStack,
  ProfileStack,
}, {
  resetOnBlur: true,
  backBehavior: 'order',
});
