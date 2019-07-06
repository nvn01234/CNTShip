import React from 'react'
import {createStackNavigator} from "react-navigation";
import OrdersScreen from "@screens/OrdersScreen";
import OrderDetailScreen from "@screens/OrderDetailScreen";
import CreateOrderScreen from "@screens/CreateOrderScreen";
import {fromRight} from "react-navigation-transitions";
import TabBarIcon from "@components/TabBarIcon";

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

export default OrdersStack;