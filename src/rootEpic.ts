import { combineEpics } from 'redux-observable'
import profilePageEpics from './profile-page/epics'


export default combineEpics(
    ...profilePageEpics as any,
)
