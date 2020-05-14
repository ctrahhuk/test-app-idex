import {
    FETCH_USERS,
    SEARCH_USERS,
    USER_SIDEBAR_MENU_SELECTED,
    USER_UNSHARED_WORKSPACE,
    USER_UNSHARED_COLLECTION,
    USERS_FETCHED, UNSHARE_USER
} from "../actions/userPageActions";
import {ArrayUtil} from "../../common/utils";
import {
    DELETE_USER,
    SAVE_USER,
    USER_DELETED,
    USER_DELETED_ERROR,
    USER_SAVED,
    USER_SAVED_ERROR
} from "../actions/userModalActions";
const uuid = require("uuid");

const menuItems= [
    {
        userType: "ACTIVE",
        id: uuid(),
        name: "Active",
    },
    {
        userType: "PENDING",
        id: uuid(),
        name: "Pending",
    },
];

export const usersPageReducer = (state = {
    users: [],
    isPreload: true,
    isLoading: true,
    menuItems,
    selectedMenu: menuItems[0],
    allUsers: []
}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, isLoading: true, ...action.payload};
        case UNSHARE_USER:
        case USER_DELETED:
        case USER_SAVED:
            return {...state, treeKey: uuid()};
        case USER_DELETED_ERROR:
        case USER_SAVED_ERROR:
            const {user} = action.payload;
            if (user) {
                user.nodes.forEach((n) => n.object.isWorkspace ? (n.status = null) : (n.nodes.forEach((nc) => nc.status = null)));
                user.status = null;
            }
            return {...state, treeKey: uuid()};
        case SAVE_USER: {
            const {user} = action.payload;
            if (user) {
                user.status = "Updating...";
                user.nodes.forEach((n) => n.object.isWorkspace ? (n.status = "Updating...") : (n.nodes.forEach((nc) => nc.status = "Updating...")));
            }
            return {...state, treeKey: uuid()};
        }
        case DELETE_USER: {
            const {user} = action.payload;
            if (user) {
                user.status = "Removing...";
                user.nodes.forEach((n) => n.object.isWorkspace ? (n.status = "Removing...") : (n.nodes.forEach((nc) => nc.status = "Removing...")));
            }
            return {...state, treeKey: uuid()};
        }
        case SEARCH_USERS:
            const searchText = action.payload.searchText;
            if (!action.payload.searchText) {
                return {...state,
                    searchText,
                    foundUsers: state.users,
                };
            } else {
                return {
                    ...state,
                    searchText,
                    foundUsers: state.users.filter((s) =>
                        s.object.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                        s.object.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
                    ),
                };
            }
        case USER_UNSHARED_WORKSPACE:
            const allUsers = state.allUsers.filter((s) => s.object.email !== action.payload.node.object.email);
            return {...state,
                allUsers,
                ...filterUsersByType(allUsers, state.selectedMenu.userType)
            };
        case USERS_FETCHED:
            return {
                ...state,
                isPreload: false,
                isLoading: false,
                ...action.payload,
                ...filterUsersByType(action.payload.allUsers, state.selectedMenu.userType)

            };
        case USER_UNSHARED_COLLECTION:
            const node = action.payload.node;
            const userParentNode = state.allUsers.find((s) => s.object.email === node.object.email);

            const collectionTypeNode = userParentNode.nodes.find((n) => n.collectionType === node.object.collectionType);
            if (collectionTypeNode) {
                collectionTypeNode.nodes = collectionTypeNode.nodes.filter((n) => n.object.id !== node.object.id);

                if (ArrayUtil.isEmpty(collectionTypeNode.nodes)) {
                    userParentNode.nodes = userParentNode.nodes.filter((n) => n.collectionType !== node.object.collectionType)
                }
            }

            return {
                ...state,
                treeKey: uuid()};
        case USER_SIDEBAR_MENU_SELECTED:
            return {...state,
                searchText: "",
                selectedMenu: action.payload.selectedMenuItem,
                ...filterUsersByType(state.allUsers, action.payload.selectedMenuItem.userType)
            };
        default:
            return state
    }
};

const filterUsersByType = (allUsers, userType) => {
    const users = allUsers
        .filter((s) => {
            if (userType === "ACTIVE") {
                return s.object.userStatus === "CONFIRMED";
            }
            return s.object.userStatus === "PENDING" || s.object.userStatus === "NOT_CONFIRMED";
        });

    return ({
        users,
        searchText: "",
        foundUsers: users
    });
};