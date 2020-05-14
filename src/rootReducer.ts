import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {
    collectionsPageReducer,
    locationsPageReducer,
    collectionProfilePageReducer,
    locationProfilePageReducer
} from "./collections/reducers";
import {modalsReducer} from "./common/components/modal/reducers";
import {reducer as notifications} from 'react-notification-system-redux';
import {itemProfilePageReducer, itemsPageReducer} from "./items/reducers";
import {issuesPageReducer} from "./issues/reducers";
import {usersPageReducer} from "./user-management/reducers";
import {reportsPageReducer} from "./reports/reducers";
import {bookingsPageReducer} from "./bookings/reducers";
import {settingsReducer} from "./settings/reducers";

export default (history) => combineReducers({
    router: connectRouter(history),
    modals: modalsReducer,
    collectionsPage: collectionsPageReducer,
    locationsPage: locationsPageReducer,
    collectionProfilePage: collectionProfilePageReducer,
    locationProfilePage: locationProfilePageReducer,
    bookingsPage: bookingsPageReducer,
    itemsPage: itemsPageReducer,
    itemProfilePage: itemProfilePageReducer,
    issuesPage: issuesPageReducer,
    usersPage: usersPageReducer,
    reportsPage: reportsPageReducer,
    settings: settingsReducer,
    notifications
});
