import {createBottomTabNavigator} from 'react-navigation'
import OrdersStack from './OrdersStack'
import HistoryStack from './HistoryStack'
import ProfileStack from './ProfileStack'

export default createBottomTabNavigator({
  OrdersStack,
  HistoryStack,
  ProfileStack,
}, {
  resetOnBlur: true,
  backBehavior: 'order',
});
