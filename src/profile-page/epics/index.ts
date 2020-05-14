import * as userPageEpics from './userPageEpics';
import * as userModalEpics from './userModalEpics';

export default [
    ...Object.values(userPageEpics),
    ...Object.values(userModalEpics),
]