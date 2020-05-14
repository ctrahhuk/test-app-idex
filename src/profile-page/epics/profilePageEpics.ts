import { ofType } from "redux-observable";
import { catchError, concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { of } from "rxjs/internal/observable/of";
import { CREATE_USER } from "../actions/profilePageActions";

export const onCreateUser = (action$) =>
    action$.pipe(
        ofType(CREATE_USER),
        map((action: any) => action.payload),
        switchMap(({shareWorkspace, role, email, collections, locations}) => {

            return of();

        }));

