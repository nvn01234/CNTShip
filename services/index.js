import authServices from './authServices'
import userServices from './userServices'
import orderServices from './orderServices'

export default {
    ...authServices,
    ...userServices,
    ...orderServices,
}
