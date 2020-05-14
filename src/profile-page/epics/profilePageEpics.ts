import { ofType } from "redux-observable";
import { catchError, concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { ShareService, UserService } from "../../common/services";
import { forkJoin } from "rxjs";
import {
    CREATE_USER, DELETE_USER,
    notifyUserCreated,
    notifyUserCreateError, notifyUserDeleted, notifyUserDeleteError, notifyUserSaved, notifyUserSaveError,
    SAVE_USER,
    userCreated, userDeleted, userDeletedError, userSaved, userSavedError
} from "../actions/userModalActions";

export const onCreateUser = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        map((action: any) => action.payload),
        switchMap(({shareWorkspace, role, email, collections, locations}) => {
            if (shareWorkspace) {
                const wsId = UserService.currentWorkspaceConfig.workspace.id;
                return ShareService.shareWorkspace(wsId, email, role, wsId)
                    .pipe(
                        mergeMap(() => {
                            return [
                                userCreated(),
                                notifyUserCreated(email)
                            ];
                        }),
                        catchError((err) => {
                            return [
                                notifyUserCreateError(email)
                            ];
                        }));

            } else {
                return forkJoin([
                    ...collections.map((c) => ShareService.shareEntity(c.id, email, c.role)),
                    ...locations.map((l) => ShareService.shareEntity(l.id, email, l.role)),
                ])
                    .pipe(
                        mergeMap(() => {
                            return [
                                userCreated(),
                                notifyUserCreated(email)
                            ];
                        }),
                        catchError(() => {
                            return [
                                notifyUserCreateError(email)
                            ];
                        }));
            }
        }));


export const onSaveUser = (action$) =>
    action$.pipe(
        ofType(SAVE_USER),
        map((action: any) => action.payload),
        switchMap(({shareWorkspace, role, email, user, collections, locations}) => {
            if (shareWorkspace) {
                const wsId = UserService.currentWorkspaceConfig.workspace.id;
                return ShareService.shareWorkspace(wsId, email, role, wsId)
                    .pipe(
                        mergeMap(() => {
                            return [
                                userCreated(),
                                notifyUserCreated(email)
                            ];
                        }),
                        catchError((err) => {
                            return [
                                notifyUserCreateError(email)
                            ];
                        }));
            } else {
                const actions = [
                    ...collections.filter((c) => c.action === "remove").map((c) =>
                        ShareService.unshare(c.id, email, "entity")),
                    ...locations.filter((l) => l.action === "remove").map((l) =>
                        ShareService.unshare(l.id, email, "entity")),
                    ...collections.filter((c) => c.action === "add").map((c) =>
                        ShareService.shareEntity(c.id, email, c.role)),
                    ...collections.filter((c) => c.action === "modify").map((c) =>
                        ShareService.shareEntity(c.id, email, c.role)),
                    ...locations.filter((l) => l.action === "add").map((l) =>
                        ShareService.shareEntity(l.id, email, l.role)),
                    ...locations.filter((l) => l.action === "modify").map((l) =>
                        ShareService.shareEntity(l.id, email, l.role))
                ];

                let obs;
                if (user && user.object.isWorkspace) {
                    obs = ShareService.unshare(UserService.currentWorkspaceConfig.workspace.id, email, "workspace")
                        .pipe(concatMap(() => forkJoin(actions)));
                } else {
                    obs = forkJoin(actions);
                }

                return obs.pipe(
                    mergeMap(() => {
                        return [
                            userSaved(),
                            notifyUserSaved(email)
                        ];
                    }),
                    catchError((err) => {
                        return [
                            userSavedError(user),
                            notifyUserSaveError(email)
                        ];
                    }));
            }


        }));


export const onDeleteUser = (action$) =>
    action$.pipe(
        ofType(DELETE_USER),
        map((action: any) => action.payload),
        switchMap(({user, collections, locations}) => {
            let obs;
            if (user.object.isWorkspace) {
                obs = ShareService.unshare(UserService.currentWorkspaceConfig.workspace.id, user.object.email, "workspace");
            } else {
                const actions = [
                    ...collections.map((c) => ShareService.unshare(c.object.id, user.object.email, "entity")),
                    ...locations.map((l) => ShareService.unshare(l.object.id, user.object.email, "entity"))
                ];
                obs = forkJoin(actions);
            }
            return obs.pipe(
                mergeMap(() => {
                    return [
                        userDeleted(),
                        notifyUserDeleted(user.object.email)
                    ];
                }),
                catchError(() => {
                    return [
                        userDeletedError(user),
                        notifyUserDeleteError(user.object.email)
                    ];
                }));

        }));


