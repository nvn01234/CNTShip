import React from 'react'
import {createStackNavigator} from "react-navigation";
import HistoryScreen from "@screens/HistoryScreen";
import OrderDetailScreen from "@screens/OrderDetailScreen";
import {fromRight} from "react-navigation-transitions";
import TabBarIcon from "@components/TabBarIcon";

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

export default HistoryStack;