import * as React from "react";
import { Panel} from "../../common/components";
import {UserService} from "../../common/services";
import {Users} from "../components/Users";
import {Action, INode} from "../../common/models";
import {connect} from 'react-redux'
import "./UsersPage.scss";
import {SidebarMenu} from "../../common/components/sidebar-menu/SidebarMenu";
import * as Actions from "../actions/userPageActions";

export interface IUsersItem {
    id: string;
    name: string;
    component: any;
    userType: "PENDING" | "ACTIVE";
}

export interface IUserPageProps {
    searchText: string;
    treeKey: string;
    isLoading: boolean;
    isPreload: boolean;
    allUsers: INode[];
    users: INode[];
    foundUsers: INode[];
    selectedMenu: IUsersItem,
    menuItems: IUsersItem[],
}

type Props = typeof Actions & IUserPageProps;

class UsersPageImpl extends React.PureComponent<Props, any> {

    constructor(props: any) {
        super(props);
        UserService.checkAccessPermission(Action.Web_UM);
    }

    public componentDidMount() {
        this.props.fetchUsers(true);
    }

    public componentWillUnmount() {
        this.props.cancelUsersFetching();
    }

    public render() {
        return <>
            <div className="left-panel">
                <Panel noPaddingContent={!this.props.isPreload} title="Users" className={"users-tab"}>
                    <>
                        <SidebarMenu onSelect={this.menuItemSelected}
                                     items={this.props.menuItems}
                                     isPreload={this.props.isPreload}
                                     selectedMenuItemId={this.props.selectedMenu.id}/>
                        {!this.props.isPreload && <button className="menu-add-user-btn" onClick={this.onAddNewUserBtnClick}>
                            Add New User
                        </button>}
                    </>
                </Panel>
            </div>
            <div className="content-panel">
                <Users {...this.props}/>
            </div>
        </>;
    }

    private onAddNewUserBtnClick = () => {
        this.props.openUserModal("Add New User", );
    };

    private menuItemSelected = (selectedMenu: any) => {
        this.props.menuItemSelected(selectedMenu);
    };

}


export const UsersPage = connect(
    ({usersPage}) => ({...usersPage}), {...Actions}
)(UsersPageImpl);