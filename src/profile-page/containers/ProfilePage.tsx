import * as React from "react";
import {connect} from 'react-redux';
import * as Actions from "../actions/profilePageActions";
import { ProfileInfo } from "../components/ProfileInfo";


export interface IUserPageProps {

}

type Props = typeof Actions & IUserPageProps;

class ProfilePageImpl extends React.PureComponent<Props, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return <>
            <ProfileInfo {...this.props}/>
        </>;
    }

}


export const ProfilePage = connect(
    ({profilePage, common}) => ({...profilePage, ...common}), {...Actions}
)(ProfilePageImpl);