import { combineReducers } from 'redux'
import { DEVICE_ROOT, BREAKING_BAD_ROOT } from './Types'

import Device from './device/Reducer'

import BreakingBadList from './breakingBadList/Reducer'

export default combineReducers({
    [DEVICE_ROOT]: Device,
    [BREAKING_BAD_ROOT]:BreakingBadList
});