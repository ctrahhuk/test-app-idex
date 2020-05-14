import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import { profilePageReducer } from "./profile-page/reducers";
import { commonReducer } from "./common/reducers";

export default (history) => combineReducers({
    router: connectRouter(history),
    profilePage: profilePageReducer,
    common: commonReducer,

});
