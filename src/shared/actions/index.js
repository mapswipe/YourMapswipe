// @flow

import { actionTypes } from 'react-redux-firebase';
import analytics from '@segment/analytics-react-native'
import type { ResultMapType, ResultType, State } from '../flow-types';
import GLOBAL from '../Globals';

export const WELCOME_COMPLETED: 'WELCOME_COMPLETED' = 'WELCOME_COMPLETED';
export const AUTH_STATUS_AVAILABLE: 'AUTH_STATUS_AVAILABLE' = 'AUTH_STATUS_AVAILABLE';
export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const TOGGLE_MAP_TILE: 'TOGGLE_MAP_TILE' = 'TOGGLE_MAP_TILE';
export const SUBMIT_BUILDING_FOOTPRINT = 'SUBMIT_BUILDING_FOOTPRINT';
export const SUBMIT_CHANGE = 'SUBMIT_CHANGE';
export const CANCEL_GROUP = 'CANCEL_GROUP';
export const START_GROUP = 'START_GROUP';
export const COMMIT_GROUP = 'COMMIT_GROUP';
export const COMMIT_GROUP_FAILED = 'COMMIT_GROUP_FAILED';
export const COMMIT_GROUP_SUCCESS = 'COMMIT_GROUP_SUCCESS';
export const COMMIT_TASK_FAILED = 'COMMIT_TASK_FAILED';
export const COMMIT_TASK_SUCCESS = 'COMMIT_TASK_SUCCESS';

type CompleteWelcome = { type: typeof WELCOME_COMPLETED };
export function completeWelcome(): CompleteWelcome {
    analytics.track('Mapswipe Mobile - Completed Welcome');
    return { type: WELCOME_COMPLETED };
}

type AuthStatusAvailable = { type: typeof AUTH_STATUS_AVAILABLE, user?: {}};
export function authStatusAvailable(user: {}): AuthStatusAvailable {
    return { type: AUTH_STATUS_AVAILABLE, user };
}

type ToggleMapTile = { type: typeof TOGGLE_MAP_TILE, resultObject: ResultType };
export function toggleMapTile(resultObject: ResultType): ToggleMapTile {
    // dispatched every time a map tile is tapped to change its state

    // since toggleMapTile gets called when tiles are loaded,
    // call the analytics function in the UI when the tile is tapped
    return { type: TOGGLE_MAP_TILE, resultObject };
}

type CancelGroup = { type: typeof CANCEL_GROUP, projectId: string, groupId: string };
export function cancelGroup(grp: { projectId: string, groupId: string }): CancelGroup {
    // dispatched when the user cancels work on a group midway
    // this forces deletion of the results created so far
    analytics.track('Mapswipe Mobile - Cancelled Group', {
      ...grp
    });
    return { type: CANCEL_GROUP, projectId: grp.projectId, groupId: grp.groupId };
}
type StartGroup = {
    type: typeof START_GROUP,
    projectId: string,
    groupId: string,
    timestamp: number,
};
export function startGroup(grp: { projectId: string, groupId: string, timestamp: number }):
StartGroup {
    // dispatched when the user cancels work on a group midway
    // this forces deletion of the results created so far
    analytics.track('Mapswipe Mobile - Started Group', {
      ...grp
    });
    return {
        type: START_GROUP,
        projectId: grp.projectId,
        groupId: grp.groupId,
        timestamp: grp.timestamp,
    };
}

type CommitGroupSuccess = { type: typeof COMMIT_GROUP_SUCCESS, projectId: string, groupId: string };
export function commitGroupSuccess(projectId: string, groupId: string): CommitGroupSuccess {
    analytics.track('Mapswipe Mobile - Completed Group', {
      projectId,
      groupId,
    });
    return { type: COMMIT_GROUP_SUCCESS, projectId, groupId };
}

type CommitGroupFailed = {
    type: typeof COMMIT_GROUP_SUCCESS,
    projectId: string,
    groupId: string,
    error: {},
};
export function commitGroupFailed(
    projectId: string,
    groupId: string,
    error: {},
): CommitGroupFailed {
    analytics.track('Mapswipe Mobile - Failed Group ', {
      projectId,
      groupId,
      error,
    });
    return {
        type: COMMIT_GROUP_FAILED,
        projectId,
        groupId,
        error,
    };
}

type CommitTaskSuccess = { type: typeof COMMIT_TASK_SUCCESS, taskId: number };
export function commitTaskSuccess(taskId: string) {
    analytics.track('Mapswipe Mobile - Completed Task', {
      taskId,
    });
    return { type: COMMIT_TASK_SUCCESS, taskId };
}

type CommitTaskFailed = { type: typeof COMMIT_TASK_FAILED, taskId: number };
export function commitTaskFailed(taskId: string, error: {}) {
    analytics.track('Mapswipe Mobile - Failed Task',{
      taskId,
      error,
    });
    return { type: COMMIT_TASK_FAILED, taskId, error };
}

type SubmitChange = { type: typeof SUBMIT_CHANGE, resultObject: ResultType };
export function submitChange(resultObject: ResultType): SubmitChange {
    analytics.track('Mapswipe Mobile - Found Change', {
      ...resultObject
    });
    return { type: SUBMIT_CHANGE, resultObject };
}

type SubmitFootprint = { type: typeof SUBMIT_BUILDING_FOOTPRINT, resultObject: ResultType };
export function submitFootprint(resultObject: ResultType): SubmitFootprint {
    analytics.track('Mapswipe Mobile - Found Building', {
      ...resultObject
    });
    return { type: SUBMIT_BUILDING_FOOTPRINT, resultObject };
}

export type GroupInfo = {
    addedDistance: number,
    groupId: string,
    projectId: string,
    contributionsCount: number,
    results: ResultMapType,
}

type CommitGroup = { type: typeof COMMIT_GROUP }
export type Action =
    | actionTypes.SET_PROFILE
    | AuthStatusAvailable
    | CommitGroup
    | CommitTaskSuccess
    | CommitTaskFailed
    | CompleteWelcome
    | ToggleMapTile

type PromiseAction = Promise<Action>;
type GetState = () => State;
type GetFirebase = () => Object;
type Dispatch = (action: Action | PromiseAction) => any;
type ThunkAction = (dispatch: Dispatch, getState: GetState, getFirebase: GetFirebase) => any;

export function commitGroup(groupInfo: GroupInfo): ThunkAction {
    // dispatched when a group is finished, when the user chooses to either
    // map another group, or complete mapping.
    // Note that when using the app offline, this action is triggered as well,
    // but the firebase layer will store results locally instead of uploading them
    // to the backend. This is transparent to us, so our code will not know its
    // online/offline status.
    return (dispatch: Dispatch, getState: GetState, getFirebase: GetFirebase) => {
        const firebase = getFirebase();
        const userId = firebase.auth().currentUser.uid;
        // get a single timestamp upon completion of the group
        const timestamp = GLOBAL.DB.getTimestamp();
        const endTime = timestamp;
        const { groupId, projectId, results } = groupInfo;
        const { startTime, ...rest } = results[projectId][groupId];
        const objToUpload = {
            startTime,
            endTime,
            timestamp,
            results: rest,
        };
        const fbPath = `results/${projectId}/${groupId}/${userId}/`;
        firebase.set(fbPath, objToUpload)
            .then(() => dispatch(commitGroupSuccess(projectId, groupId)))
            .catch(error => dispatch(commitGroupFailed(projectId, groupId, error)));
    };
}
