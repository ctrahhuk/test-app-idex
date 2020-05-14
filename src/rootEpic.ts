import { combineEpics } from 'redux-observable'
import collectionsEpics from './collections/epics'
import issuesPageEpics from './issues/epics'
import itemsEpics from './items/epics'
import usersEpics from './user-management/epics'
import modalEpics from './common/components/modal/epics'
import modalsEpics from './common/components/modals/epics'
import attachmentsPanelEpics from './common/components/profile-panels/attachments-panel/epics'
import commentsPanelEpics from './common/components/profile-panels/comments-panel/epics'
import informationPanelEpics from './common/components/profile-panels/information-panel/epics'
import remindersPanelEpics from './common/components/profile-panels/reminders-panel/epics'
import relatedItemsEpics from './common/components/profile-panels/related-items-panel/epics'
import issuesEpics from './common/components/profile-panels/issues-panel/epics'
import locationEpics from './common/components/profile-panels/locations-panel/epics'
import tagsEpics from './common/components/profile-panels/tags-panel/epics'
import valueEpics from './common/components/profile-panels/value-panel/epics'
import profilePicPanelEpics from './common/components/profile-panels/entity-main-profile-panel/epics'
import reportsEpics from './reports/epics'
import bookingsEpics from './bookings/epics'
import settingsEpics from './settings/epics'

export default combineEpics(
    ...collectionsEpics as any,
    ...issuesPageEpics as any,
    ...bookingsEpics as any,
    ...itemsEpics as any,
    ...usersEpics as any,
    ...modalEpics,
    ...modalsEpics as any,
    ...attachmentsPanelEpics as any,
    ...commentsPanelEpics as any,
    ...informationPanelEpics as any,
    ...remindersPanelEpics as any,
    ...relatedItemsEpics as any,
    ...tagsEpics as any,
    ...issuesEpics as any,
    ...locationEpics as any,
    ...profilePicPanelEpics as any,
    ...reportsEpics as any,
    ...settingsEpics as any,
    ...valueEpics as any,
)
