import {NotificationService} from "../../common/services";

export const CREATE_USER = 'CREATE_USER';
export const USER_CREATED = 'USER_CREATED';
export const SAVE_USER = 'SAVE_USER';
export const USER_SAVED = 'USER_SAVED';
export const USER_SAVED_ERROR = 'USER_SAVED_ERROR';
export const DELETE_USER = 'DELETE_USER';
export const USER_DELETED = 'USER_DELETED';
export const USER_DELETED_ERROR = 'USER_DELETED_ERROR';


export const createUser  = (shareWorkspace, role, email, collections?, locations?) => {
    return {
        type: CREATE_USER,
        payload: {
            shareWorkspace, role, email, collections, locations
        }
    };
};


export const userCreated  = () => {
    return {
        type: USER_CREATED,
        payload: {
        }
    };
};


export const saveUser  = (shareWorkspace, role, email, user?, collections?, locations?) => {
    return {
        type: SAVE_USER,
        payload: {
            shareWorkspace, role, email, user, collections, locations
        }
    };
};

export const userSaved  = () => {
    return {
        type: USER_SAVED,
        payload: {
        }
    };
};
export const userSavedError  = (user) => {
    return {
        type: USER_SAVED_ERROR,
        payload: {
            user
        }
    };
};

export const deleteUser  = (user, collections?, locations?) => {
    return {
        type: DELETE_USER,
        payload: {
            user, collections, locations
        }
    };
};

export const userDeleted  = () => {
    return {
        type: USER_DELETED,
        payload: {
        }
    };
};

export const userDeletedError  = (user) => {
    return {
        type: USER_DELETED_ERROR,
        payload: {
            user
        }
    };
};

export const  notifyUserCreated = (email) =>
    NotificationService.success(`User ${email} created`);

export const  notifyUserCreateError = (email) =>
    NotificationService.error(`Failed to create user ${email}`);

export const  notifyUserSaved = (email) =>
    NotificationService.success(`User ${email} saved`);

export const  notifyUserSaveError = (email) =>
    NotificationService.error(`Failed to save user ${email}`);

export const  notifyUserDeleted = (email) =>
    NotificationService.success(`User ${email} deleted`);

export const  notifyUserDeleteError = (email) =>
    NotificationService.error(`Failed to delete user ${email}`);